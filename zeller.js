const dateInput = document.getElementById("date-input");
const resultsDiv = document.getElementById("results");
const countBtn = document.getElementById("count-btn");
const mSpan = document.getElementById("m");
const kSpan = document.getElementById("k");
const jSpan = document.getElementById("j");
const partialHSpan = document.getElementById("partial-h");
const hSpan = document.getElementById("h");
const daySpan = document.getElementById("day");

const days = [
  "sobota",
  "niedziela",
  "poniedziałek",
  "wtorek",
  "środa",
  "czwartek",
  "piątek"
];

function getZeller(date) {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const m = month < 3 ? month + 12 : month;
  const fixedYear = month < 3 ? year - 1 : year;
  const k = fixedYear % 100;
  const j = Math.floor(fixedYear / 100);
  const partialH =
    day +
    Math.floor((13 * (m + 1)) / 5) +
    k +
    Math.floor(k / 4) +
    Math.floor(j / 4) +
    5 * j;
  const h = partialH % 7;
  const weekDay = days[h];

  return {
    m,
    k,
    j,
    partialH,
    h,
    weekDay
  };
}

function displayCalculations(result) {
  mSpan.innerText = result.m;
  kSpan.innerText = result.k;
  jSpan.innerText = result.j;
  partialHSpan.innerText = result.partialH;
  hSpan.innerText = result.h;
  daySpan.innerText = result.weekDay;

  resultsDiv.style.display = "block";
}

function handleBtnClick() {
  const date = dateInput.value;
  if (date) {
    const result = getZeller(new Date(date));
    displayCalculations(result);
  }
}

countBtn.addEventListener("click", handleBtnClick);
