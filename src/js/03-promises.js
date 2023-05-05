import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formInDoc = document.querySelector('.form');
const delayInDoc = document.querySelector('[name="delay"]');
const stepInDoc = document.querySelector('[name="step"]');
const amountInDoc = document.querySelector('[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formInDoc.addEventListener('submit', event => {
  event.preventDefault();
  let finalDelay = Number(delayInDoc.value) - Number(stepInDoc.value);
  for (let i = 1; i <= amountInDoc.value; i += 1) {
    finalDelay += Number(stepInDoc.value);
    createPromise(i, finalDelay)
      .then(object => {
        const { position, delay } = object;
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(object => {
        const { position, delay } = object;
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.currentTarget.reset();
});
