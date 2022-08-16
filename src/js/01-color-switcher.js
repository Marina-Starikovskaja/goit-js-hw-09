const btnStart = document.querySelector('[data-start]')
const btnStop = document.querySelector('[data-stop]')

btnStart.addEventListener('click', colorRandomStart);
btnStop.addEventListener('click', colorRandomStop);
btnStop.setAttribute('disable', true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

function colorRandomStart() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
}

function colorRandomStop() {
  clearInterval(timerId);
  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');
}