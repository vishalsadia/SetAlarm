const timerList = document.getElementById('timer-list');
const newTimerForm = document.getElementById('new-timer-form');
const newTimerTime = document.getElementById('new-timer-time');

newTimerForm.addEventListener('submit', e => {
  e.preventDefault();
  const time = newTimerTime.value;
  const timer = createTimer(time);
  timerList.appendChild(timer);
});

function createTimer(time) {
  const timer = document.createElement('li');
  timer.classList.add('timer');

  const timeInput = document.createElement('input');
  timeInput.type = 'time';
  timeInput.value = time;
  timeInput.disabled = true;
  timer.appendChild(timeInput);

  const startBtn = document.createElement('button');
  startBtn.textContent = 'Start';
  timer.appendChild(startBtn);

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  timer.appendChild(resetBtn);

  let intervalId;
  let timeLeft;

  function start() {
    const [hours, minutes, seconds] = timeInput.value.split(':').map(Number);
    timeLeft = hours * 3600 + minutes * 60 + seconds;
    intervalId = setInterval(() => {
      if (timeLeft <= 0) {
        stop();
        return;
      }
      timeLeft--;
      const [hours, minutes, seconds] = [Math.floor(timeLeft / 3600), Math.floor((timeLeft % 3600) / 60), timeLeft % 60].map(num => num.toString().padStart(2, '0'));
      timeInput.value = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  }

  function stop() {
    clearInterval(intervalId);
  }

  function reset() {
    stop();
    timeLeft = null;
    const [hours, minutes, seconds] = timeInput.value.split(':').map(Number);
    timeLeft = hours * 3600 + minutes * 60 + seconds;
  }

  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', reset);

  return timer;
}