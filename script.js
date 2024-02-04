const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapList = document.getElementById('lapList');
let startTime, elapsedTime, timerId;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);
  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);
  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);
  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");
  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function start() {
  if (!startTime) {
    startTime = Date.now();
  }
  timerId = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = timeToString(elapsedTime);
  }, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
}

function pause() {
  clearInterval(timerId);
  const lap = document.createElement('li');
  lap.textContent = timeToString(elapsedTime);
  lapList.appendChild(lap);
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function reset() {
  clearInterval(timerId);
  startTime = null;
  elapsedTime = 0;
  display.textContent = timeToString(elapsedTime);
  lapList.innerHTML = '';
  startButton.disabled = false;
  pauseButton.disabled = true;
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);