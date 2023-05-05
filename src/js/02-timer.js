import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const picker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysInDoc = document.querySelector('[data-days]');
const hoursInDoc = document.querySelector('[data-hours]');
const minutesInDoc = document.querySelector('[data-minutes]');
const secondsInDoc = document.querySelector('[data-seconds]');
startBtn.disabled = true;

const currentTime = {};

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const status = checkTime(selectedDates[0]);
    if (status) {
      currentTime.value = selectedDates[0];
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};

flatpickr(picker, options);

function checkTime(value) {
  startBtn.disabled = true;
  if (options.defaultDate - value <= 0) {
    startBtn.disabled = false;
    return true;
  }
}

startBtn.addEventListener('click', timerStart);

function timerStart() {
  const intervalId = setInterval(() => {
    const timeDifference = currentTime.value - new Date();
    if (timeDifferenceCheck(timeDifference)) {
      clockTimer(timeDifference);
    } else clearInterval(intervalId);
  }, 1000);
}

function timeDifferenceCheck(value) {
  if (value <= 0) {
    return false;
  } else return true;
}

function clockTimer(value) {
  const { days, hours, minutes, seconds } = convertMs(value);
  daysInDoc.textContent = String(days).padStart(2, '0');
  hoursInDoc.textContent = String(hours).padStart(2, '0');
  minutesInDoc.textContent = String(minutes).padStart(2, '0');
  secondsInDoc.textContent = String(seconds).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
