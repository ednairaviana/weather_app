import { dataBase } from "./database";

let miliseconds;

function getDateApi() {
  let date = new Date().toLocaleString("en-US", {
    timeZone: dataBase.location.tz_id,
    hourCycle: "h24",
    month: "short",
    weekday: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  miliseconds = new Date(date).getTime();
}

function setDate() {
  const currentTime = miliseconds;
  const fullDate = new Date(currentTime);
  const year = fullDate.getFullYear();
  const month = fullDate.getMonth();
  const day = fullDate.getDate();

  const h = fullDate.getHours();
  const m = fullDate.getMinutes();
  const s = fullDate.getSeconds();

  console.log(`${day}/${month}/${year} ${h}:${m}:${s}`);

  setTimeout(() => {
    miliseconds += 1000;
    setDate();
  }, 1000);
}

function updateClock() {
  getDateApi();
  setDate();
  console.log(miliseconds);
}

export { updateClock };
