// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import 'flatpickr/dist/themes/material_blue.css';
// all modules
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  timeout: 3000,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  clickToClose: false,
  pauseOnHover: true,
});

const rest = {
  inputEl: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let timeData = null

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    // Функция flatpickr для запуска при каждом открытии календаря. Останавливает таймер и сбрасывает счетчик при открытии
    onOpen() {
        clearInterval(timerId)
        rest.days.textContent = '00';
        rest.hours.textContent = '00';
        rest.minutes.textContent = '00';
        rest.seconds.textContent = '00';
  },
    // Функция flatpickr для запуска при каждом закрытии календаря.
    onClose(selectedDates) {
        timeData = selectedDates[0].getTime();
    //  Проверяет дату и отключает с помощью disable
    if (timeData < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      rest.btnStart.setAttribute('disabled', true);
      return;
    }
    rest.btnStart.removeAttribute('disabled');
    },
};

const dataInput = flatpickr(rest.inputEl, options);

rest.btnStart.addEventListener('click', startButton);
rest.btnStart.setAttribute('disabled', true);

function startButton() {
  timer = setInterval(() => {
    const deltaTime = timeData - new Date().getTime();

    if (deltaTime <= 0) {
      clearInterval(timer);
      return;
    }
    const time = convertMs(deltaTime);
    updateClockInfo(time);
  }, 1000);

  rest.btnStart.setAttribute('disabled', true);
}

// меняем значения таймера
function updateClockInfo({ days, hours, minutes, seconds }) {
  rest.days.textContent = `${days}`;
  rest.hours.textContent = `${hours}`;
  rest.minutes.textContent = `${minutes}`;
  rest.seconds.textContent = `${seconds}`;
}

// В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов. 
// Напиши функцию addLeadingZero(value), которая использует метод метод padStart() 
// и перед отрисовкой интефрейса форматируй значение.

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining days
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
