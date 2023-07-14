const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
startBtn.addEventListener('click', startChanges);
stopBtn.addEventListener('click', stopChanges);

let intervalId = null;
let isActive = false;
function startChanges(event) {
  console.dir(event.target);
  if (isActive) {
    return;
  }
  isActive = true;
  event.target.disabled = true;
  intervalId = setInterval(() => {
    // console.log('Починають змінюватись кольори боди');
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChanges() {
  // console.log('Зупинити змінювати колір');
  clearInterval(intervalId);
  isActive = false;
  startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
