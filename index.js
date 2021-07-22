const dateInput = document.getElementById("date-input");
const resultsDiv = document.getElementById("results");
const countBtn = document.getElementById("count-btn");
const partialRfcSpan = document.getElementById("partial-rfc");
const rfcSpan = document.getElementById("rfc");
const partialSSpan = document.getElementById("partial-s");
const sSpan = document.getElementById("s");
const rfcDaySpan = document.getElementById("rfc-day");
const sDaySpan = document.getElementById("s-day");

const days = [
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota"
];

function getRfc(day, month, year) {
  month -= 2;
  if (month < 1) {
    month += 12;
    --year;
  }
  const cent = Math.floor(year / 100);
  year %= 100;

  const partial =
    Math.floor((26 * month - 2) / 10) +
    day +
    year +
    Math.floor(year / 4) +
    Math.floor(cent / 4) +
    5 * cent;

  const result = partial % 7;
  const weekDay = days[result];

  return {
    partial,
    result,
    weekDay
  };
}

function getSakamoto(day, month, year) {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  year -= +(month < 3);

  const partial =
    year +
    Math.floor(year / 4) -
    Math.floor(year / 100) +
    Math.floor(year / 400) +
    t[month - 1] +
    day;
  const result = partial % 7;
  const weekDay = days[result];

  return {
    partial,
    result,
    weekDay
  };
}

function displayCalculations(rfc, sakamoto) {
  partialRfcSpan.innerText = rfc.partial;
  rfcSpan.innerText = rfc.result;
  rfcDaySpan.innerText = rfc.weekDay;
  partialSSpan.innerText = sakamoto.partial;
  sSpan.innerText = sakamoto.result;
  sDaySpan.innerText = sakamoto.weekDay;

  resultsDiv.style.display = "block";
}

function handleBtnClick() {
  let date = dateInput.value;
  if (date) {
    date = new Date(date);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const rfc = getRfc(day, month, year);
    const sakamoto = getSakamoto(day, month, year);
    displayCalculations(rfc, sakamoto);
  }
}

countBtn.addEventListener("click", handleBtnClick);
