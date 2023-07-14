import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
startBtn.addEventListener('click', onStartBtnClick);

startBtn.disabled = true;
let selectedDate = null;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();

    const date = this.config.defaultDate;
    if (selectedDate > date) {
      startBtn.disabled = false;
      return;
    } else {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
});

function onStartBtnClick() {
  if (selectedDate) {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const deltaTime = selectedDate - currentTime;
      if (deltaTime <= 0) {
        clearInterval(intervalId);
      } else {
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        console.log(`${days}:${hours}:${minutes}:${seconds}`);
        timerDays.textContent = `${days} `;
        timerHours.textContent = `${hours} `;
        timerMinutes.textContent = `${minutes} `;
        timerSeconds.textContent = `${seconds}`;
      }
    }, 1000);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day)
    .toString()
    .padStart(3, '0');
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
