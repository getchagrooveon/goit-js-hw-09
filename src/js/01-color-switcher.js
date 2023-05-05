function getRandomHexColor() {
    return `#${Math.random().toString(16).slice(2, 8)}`;
  }

const startBtn = document.querySelector("[data-start]")
const stopBtn = document.querySelector("[data-stop]")

let timerId = null

function setTimer() {
    timerId = setInterval(()=> document.body.style.backgroundColor = getRandomHexColor(), 1000)
}

startBtn.addEventListener("click", (event) => {
    setTimer()
    startBtn.disabled = true
    stopBtn.disabled = false
})

stopBtn.addEventListener("click", (event) =>{
    clearInterval(timerId)
    stopBtn.disabled = true
    startBtn.disabled = false
})