import { getDate } from "./createFooComp";
import { dataBase } from "./database";

function setHeaderInfo(name, subt, date) {
  const mainTitle = document.querySelector("#current-city");
  const subtTtl = document.querySelector("#region-country");
  const currentDate = document.querySelector("#current-date");

  mainTitle.innerText = name;
  subtTtl.innerText = subt;
  currentDate.innerText = date;
}

function splitDate(date) {
    const arDate = date.split(" ");

    return arDate[0];
}

function renderHeader() {
  const name = dataBase.location.name;
  const subt = `${dataBase.location.region} - ${dataBase.location.country}`;
  const date = getDate(splitDate(dataBase.location.localtime));

  setHeaderInfo(name, subt, date);
}

export { renderHeader };
