const dateInput = document.getElementById("date-input");
const resultsDiv = document.getElementById("results");
const countBtn = document.getElementById("count-btn");
const jdSpan = document.getElementById("jd");
const rdSpan = document.getElementById("rd");
const wSpan = document.getElementById("w");
const daySpan = document.getElementById("day");

const days = [
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek",
  "sobota"
];

function getJulianDay(day, month, year) {
  const x = (month + 9) / 12;
  const a = 4716 + year + Math.floor(x);
  const y = (275 * month) / 9;
  const v = (7 * a) / 4;
  const b = 1729279.5 + 367 * year + Math.floor(y) - Math.floor(v) + day;
  const q = (a + 83) / 100;
  const c = Math.floor(q);
  const w = (3 * (c + 1)) / 4;
  const e = Math.floor(w);

  return b + 38 - e;
}

function getRataDie(date) {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const jd = getJulianDay(day, month, year);
  const rd = Math.floor(jd - 1721424.5);
  const w = (1 + rd - 1) % 7;
  const weekDay = days[w];

  return {
    jd,
    rd,
    w,
    weekDay
  };
}

function displayCalculations(result) {
  jdSpan.innerText = result.jd;
  rdSpan.innerText = result.rd;
  wSpan.innerText = result.w;
  daySpan.innerText = result.weekDay;

  resultsDiv.style.display = "block";
}

function handleBtnClick() {
  const date = dateInput.value;
  if (date) {
    const result = getRataDie(new Date(date));
    displayCalculations(result);
  }
}

countBtn.addEventListener("click", handleBtnClick);
