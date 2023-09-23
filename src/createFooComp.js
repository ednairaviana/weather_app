import { dataBase } from "./database";

const footerSection = document.querySelector(".footer-section");

function createFooterComponent(day, date, icon, temp, chanceRain) {
  const footerComponent = document.createElement("div");
  footerComponent.classList.add("foo-comp");

  footerComponent.innerHTML = `<div>
            <p class="_medium">${day}</p>
            <p class="_small">${date}</p>
          </div>

          <img class="main-icon" src="${icon}" />

          <div class="wrap-icon">
            <img src="./assets/weather_icons/icons8-thermometer-50.png" />
            <div class="cont-icon">
              <p class="_small _alEnd">temperature</p>
              <p class="_medium">${temp}°C</p>
            </div>
          </div>

          <div class="wrap-icon">
            <img src="./assets/weather_icons/icons8-rain-50.png" />
            <div class="cont-icon">
              <p class="_small _alEnd">chance of rain</p>
              <p class="_medium">${chanceRain}%</p>
            </div>
          </div>`;

  footerSection.insertAdjacentElement("beforeend", footerComponent);
}

function getDate(date) {
  const fullDate = date.split("-");

  const day = fullDate[2];
  const month = fullDate[1];
  const year = fullDate[0];

  return `${month}/${day}/${year}`;
}

function getDay(date) {
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekDay = new Date(date).getDay();
  const day = week[weekDay];

  return day;
}

function renderFooterComponents() {
  clearFooterSection();
  const days = dataBase.forecast.forecastday;

  days.forEach((element) => {
    const day = getDay(element.date);
    const date = getDate(element.date);
    const icon = element.day.condition.icon;
    const temp = element.day.avgtemp_c;
    const chanceRain = element.day.daily_chance_of_rain;

    createFooterComponent(day, date, icon, temp, chanceRain);
  });
}

function clearFooterSection() {
  while (footerSection.firstChild) {
    footerSection.removeChild(footerSection.firstChild);
  }
}

export { renderFooterComponents, getDate };
