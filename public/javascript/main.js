// persian date
let yearElement = document.getElementById("year");
let monthElement = document.getElementById("month");
let dayElement = document.getElementById("day");

let gerigorianDate = new Date();
let persianDate = jalaali.toJalaali(
  gerigorianDate.getFullYear(),
  gerigorianDate.getMonth(),
  gerigorianDate.getDate()
);

yearElement.innerText = toPersianNumber(persianDate.jy);
monthElement.innerText = toPersianNumber(persianDate.jm + 1);
dayElement.innerText = toPersianNumber(persianDate.jd + 1);

// persian count down
let daysElement = document.getElementById("days");
let hoursElement = document.getElementById("hours");
let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");

let targetPersianDate = {
  jy: 1403,
  jm: 8,
  jd: 20,
};

let persianToGregorian = jalaali.toGregorian(
  targetPersianDate.jy,
  targetPersianDate.jm,
  targetPersianDate.jd
);

let targetDate = new Date(
  persianToGregorian.gy,
  persianToGregorian.gm - 1,
  persianToGregorian.gd
);

let seconds = 1000;
let minutes = seconds * 60;
let hours = minutes * 60;
let days = hours * 24;

function toPersianNumber(number) {
  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  return String(number).replace(/\d/g, (digit) => persianDigits[digit]);
}

function formatNumber(numbers) {
  return numbers < 10 && numbers > -1 ? `0${numbers}` : numbers;
}

function updateCountDown() {
  let now = new Date();
  let remainingTime = targetDate - now;

  daysElement.innerText = toPersianNumber(
    formatNumber(Math.floor(remainingTime / days))
  );
  hoursElement.innerText = toPersianNumber(
    formatNumber(Math.floor((remainingTime % days) / hours))
  );
  minutesElement.innerText = toPersianNumber(
    formatNumber(Math.floor((remainingTime % hours) / minutes))
  );
  secondsElement.innerText = toPersianNumber(
    formatNumber(Math.floor((remainingTime % minutes) / seconds))
  );

  if (remainingTime < 0) {
    daysElement.innerText = "۰۰";
    hoursElement.innerText = "۰۰";
    minutesElement.innerText = "۰۰";
    secondsElement.innerText = "۰۰";
    clearInterval(interval);
  }
}

let interval = setInterval(updateCountDown, 1000);
