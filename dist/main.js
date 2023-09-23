/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/clock.js":
/*!**********************!*\
  !*** ./src/clock.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDateApi: () => (/* binding */ getDateApi),
/* harmony export */   updateMili: () => (/* binding */ updateMili)
/* harmony export */ });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database */ "./src/database.js");


const clock = document.querySelector("#clock");
let miliseconds;

function setClock() {
  const currentTime = miliseconds;
  const fullDate = new Date(currentTime);

  let h = fullDate.getHours();
  let m = fullDate.getMinutes();
  let s = fullDate.getSeconds();

  if(isNaN(miliseconds) || miliseconds === undefined) {
    clock.innerText = "";
    return;
  }

  if (h < 10) {
    h = `0${h}`;
  }
  if (m < 10) {
    m = `0${m}`;
  }
  if (s < 10) {
    s = `0${s}`;
  }
  clock.innerText = `${h}:${m}:${s}`;
}

function getDateApi() {
  let date = new Date().toLocaleString("en-US", {
    timeZone: _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.location.tz_id,
    hourCycle: "h24",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: "true",
  });

  miliseconds = new Date(date).getTime();
}

function updateMili() {
  setClock();
  const timeout = setTimeout(() => {
    miliseconds += 1000;
    updateMili();
    setClock();
  }, 1000);
}






/***/ }),

/***/ "./src/createAsComp.js":
/*!*****************************!*\
  !*** ./src/createAsComp.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderAsideComponent: () => (/* binding */ renderAsideComponent)
/* harmony export */ });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database */ "./src/database.js");


const asideSection = document.querySelector(".aside-section");

function createAsComp(hour, icon, text, temp, chanceRain) {
  const asComponent = document.createElement("div");
  asComponent.classList.add("as-comp");

  asComponent.innerHTML = `<div class="as-comp-header">
              <img src="./assets/weather_icons/icons8-clock-50.png" />
              <p>${hour}</p>
            </div>

            <div class="as-comp-cont">
              <div class="icon">
                <img class="main-icon" src="${icon}" />
                <p class="_medium-1">${text}</p>
              </div>

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
              </div>
            </div>`;

  asideSection.insertAdjacentElement("beforeend", asComponent);
}

function renderAsideComponent(index) {
  clearAsideSection();
  const hours = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.forecast.forecastday[index].hour;

  hours.forEach((element) => {
    const hour = element.time.split(" ")[1];
    const icon = `https://${element.condition.icon}`;
    const text = element.condition.text;
    const temp = element.temp_c;
    const chanceRain = element.chance_of_rain;

    createAsComp(hour, icon, text, temp, chanceRain);
  });
}

function clearAsideSection() {
  while (asideSection.firstChild) {
    asideSection.removeChild(asideSection.firstChild);
  }
}




/***/ }),

/***/ "./src/createFooComp.js":
/*!******************************!*\
  !*** ./src/createFooComp.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDate: () => (/* binding */ getDate),
/* harmony export */   renderFooterComponents: () => (/* binding */ renderFooterComponents)
/* harmony export */ });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database */ "./src/database.js");
/* harmony import */ var _createMainSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createMainSection */ "./src/createMainSection.js");
/* harmony import */ var _createAsComp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createAsComp */ "./src/createAsComp.js");




const footerSection = document.querySelector(".footer-section");

function createFooterComponent(day, date, icon, temp, chanceRain, id) {
  const footerComponent = document.createElement("div");
  footerComponent.classList.add("foo-comp");
  footerComponent.setAttribute("data-id", `${id}`);

  footerComponent.innerHTML = `<div>
            <p class="_medium">${day}</p>
            <p class="_small">${date}</p>
          </div>

          <img class="main-icon" src="${icon}" />

 
            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-thermometer-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">temperature</p>
                <p class="_medium-1">${temp}°C</p>
              </div>
            </div>

            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-rain-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">chance of rain</p>
                <p class="_medium-1">${chanceRain}%</p>
              </div>
            </div>`;

  footerSection.insertAdjacentElement("beforeend", footerComponent);

  footerComponent.addEventListener("click", () => {
    const index = footerComponent.dataset.id;
    setCurrentComp();
    (0,_createMainSection__WEBPACK_IMPORTED_MODULE_1__.renderMSComponents)(index);
    (0,_createAsComp__WEBPACK_IMPORTED_MODULE_2__.renderAsideComponent)(index);
  });

  function setCurrentComp() {
    footerSection.childNodes.forEach((child) => {
      child.style.opacity = "1";
      child.style.pointerEvents = "auto";
    });
    footerComponent.style.opacity = "0.6";
    footerComponent.style.pointerEvents = "none";
  }
}

function renderFooterComponents() {
  clearFooterSection();

  const days = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.forecast.forecastday;
  days.forEach((element, index) => {
    const day = getDay(element.date);
    const date = getDate(element.date);
    const icon = `https://${element.day.condition.icon}`;
    const temp = element.day.avgtemp_c;
    const chanceRain = element.day.daily_chance_of_rain;

    createFooterComponent(day, date, icon, temp, chanceRain, index);
  });

  initCurrent();
}

function clearFooterSection() {
  while (footerSection.firstChild) {
    footerSection.removeChild(footerSection.firstChild);
  }
}

function initCurrent() {
  const init = footerSection.childNodes[0];
  init.style.opacity = "0.6";
  init.style.pointerEvents = "none";
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




/***/ }),

/***/ "./src/createHeaderComp.js":
/*!*********************************!*\
  !*** ./src/createHeaderComp.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHeader: () => (/* binding */ renderHeader)
/* harmony export */ });
/* harmony import */ var _createFooComp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createFooComp */ "./src/createFooComp.js");
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database */ "./src/database.js");



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
  const name = _database__WEBPACK_IMPORTED_MODULE_1__.dataBase.location.name;
  const subt = `${_database__WEBPACK_IMPORTED_MODULE_1__.dataBase.location.region} - ${_database__WEBPACK_IMPORTED_MODULE_1__.dataBase.location.country}`;
  const date = (0,_createFooComp__WEBPACK_IMPORTED_MODULE_0__.getDate)(splitDate(_database__WEBPACK_IMPORTED_MODULE_1__.dataBase.location.localtime));

  setHeaderInfo(name, subt, date);
}




/***/ }),

/***/ "./src/createMainSection.js":
/*!**********************************!*\
  !*** ./src/createMainSection.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderMSComponents: () => (/* binding */ renderMSComponents)
/* harmony export */ });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database */ "./src/database.js");
/* harmony import */ var _createFooComp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createFooComp */ "./src/createFooComp.js");



const mainSection = document.querySelector(".main-section");

function createMSComponents(
  title,
  date,
  icon,
  text,
  temp,
  feelsLike,
  maxTemp,
  minTemp,
  chanceRain,
  precipitation,
  windSpeed,
  humidity,
  sunrise,
  sunset
) {
  mainSection.innerHTML = `<div class="wr-header">
            <div>
              <h1 class="main-subt">${title}</h1>
              <p>${date}</p>
            </div>

            <div class="icon">
              <img class="main-icon" src="${icon}" />
              <p class="_medium-1">${text}</p>
            </div>
          </div>

          <div class="wr-content">
            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-thermometer-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">temperature</p>
                <p class="_medium">${temp}</p>
              </div>
            </div>

            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-thermometer-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">feels like</p>
                <p class="_medium">${feelsLike}</p>
              </div>
            </div>

            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-thermometer-up-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">max</p>
                <p class="_medium">${maxTemp}</p>
              </div>
            </div>

            <div class="wrap-icon">
              <img
                src="./assets/weather_icons/icons8-thermometer-down-50.png"
              />
              <div class="cont-icon">
                <p class="_small _alEnd">min</p>
                <p class="_medium">${minTemp}</p>
              </div>
            </div>

            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-rain-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">chance of rain</p>
                <p class="_medium">${chanceRain}%</p>
              </div>
            </div>

            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-hygrometer-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">precipitation</p>
                <p class="_medium">${precipitation}<span class="_small">mm</span></p>
              </div>
            </div>

            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-wind-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">wind speed</p>
                <p class="_medium">${windSpeed}<span class="_small">km/h</span></p>
              </div>
            </div>

            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-drop-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">humidity</p>
                <p class="_medium">${humidity}%</p>
              </div>
            </div>

            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-sunrise-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">sunrise</p>
                <p class="_medium-1">${sunrise}</p>
              </div>
            </div>

            <div class="wrap-icon">
              <img src="./assets/weather_icons/icons8-sunset-50.png" />
              <div class="cont-icon">
                <p class="_small _alEnd">sunset</p>
                <p class="_medium-1">${sunset}</p>
              </div>
            </div>
          </div>`;
}

function getDay(date) {
  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weekDay = new Date(date).getDay();
  const day = week[weekDay];

  return day;
}

function setHour(hour) {
  const arHour = hour.split(" ");
  return `${arHour[0]}<span class="_small">${arHour[1]}</span>`;
}

function renderMSComponents(index) {
  const target = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.forecast.forecastday[index];
  const title = getDay(target.date);
  const date = (0,_createFooComp__WEBPACK_IMPORTED_MODULE_1__.getDate)(target.date);
  const icon = `https://${target.day.condition.icon}`;
  const text = target.day.condition.text;
  let temp = target.day.avgtemp_c;
  let feelsLike = "-/-";
  const maxTemp = target.day.maxtemp_c;
  const minTemp = target.day.mintemp_c;
  const chanceRain = target.day.daily_chance_of_rain;
  const precipitation = target.day.totalprecip_mm;
  let windSpeed = "-/-";
  const humidity = target.day.avghumidity;
  const sunrise = setHour(target.astro.sunrise);
  const sunset = setHour(target.astro.sunset);

  if (index === "0") {
    temp = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.current.temp_c;
    feelsLike = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.current.feelslike_c;
    windSpeed = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.current.wind_kph;
  }

  createMSComponents(
    title,
    date,
    icon,
    text,
    temp,
    feelsLike,
    maxTemp,
    minTemp,
    chanceRain,
    precipitation,
    windSpeed,
    humidity,
    sunrise,
    sunset
  );
}




/***/ }),

/***/ "./src/database.js":
/*!*************************!*\
  !*** ./src/database.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dataBase: () => (/* binding */ dataBase),
/* harmony export */   getData: () => (/* binding */ getData)
/* harmony export */ });
let dataBase;

async function getData(value) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=c55ebf895da8496991f222042231809&q=${value}&days=10&aqi=no&alerts=no`
  );
  const data = await response.json();

  dataBase = data;
}



/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   doThings: () => (/* binding */ doThings)
/* harmony export */ });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database */ "./src/database.js");
/* harmony import */ var _createAsComp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createAsComp */ "./src/createAsComp.js");
/* harmony import */ var _createFooComp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createFooComp */ "./src/createFooComp.js");
/* harmony import */ var _createMainSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createMainSection */ "./src/createMainSection.js");
/* harmony import */ var _createHeaderComp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createHeaderComp */ "./src/createHeaderComp.js");
/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clock */ "./src/clock.js");







async function doThings(value) {
  await (0,_database__WEBPACK_IMPORTED_MODULE_0__.getData)(value);
  console.log(_database__WEBPACK_IMPORTED_MODULE_0__.dataBase); //display things -> wait for data
  (0,_clock__WEBPACK_IMPORTED_MODULE_5__.getDateApi)();
  (0,_createHeaderComp__WEBPACK_IMPORTED_MODULE_4__.renderHeader)();
  (0,_createMainSection__WEBPACK_IMPORTED_MODULE_3__.renderMSComponents)("0");
  (0,_createAsComp__WEBPACK_IMPORTED_MODULE_1__.renderAsideComponent)("0");
  (0,_createFooComp__WEBPACK_IMPORTED_MODULE_2__.renderFooterComponents)();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clock.js */ "./src/clock.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");



(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.doThings)("london");
searchOnClick();
(0,_clock_js__WEBPACK_IMPORTED_MODULE_0__.updateMili)();

function searchOnClick() {
  const searchInput = document.querySelector("#search");
  const btn = document.querySelector("#btn");

  btn.addEventListener("click", () => {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.doThings)(searchInput.value);
  });
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksRUFBRTtBQUNkO0FBQ0E7QUFDQSxZQUFZLEVBQUU7QUFDZDtBQUNBO0FBQ0EsWUFBWSxFQUFFO0FBQ2Q7QUFDQSx1QkFBdUIsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYywrQ0FBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ2tDOzs7Ozs7Ozs7Ozs7Ozs7O0FDekRJO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFLO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEtBQUs7QUFDbkQsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLEtBQUs7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0NBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHVCQUF1QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RE07QUFDbUI7QUFDSDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsR0FBRztBQUNoRDtBQUNBO0FBQ0EsaUNBQWlDLElBQUk7QUFDckMsZ0NBQWdDLEtBQUs7QUFDckM7QUFDQTtBQUNBLHdDQUF3QyxLQUFLO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxLQUFLO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksc0VBQWtCO0FBQ3RCLElBQUksbUVBQW9CO0FBQ3hCLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLCtDQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwyQkFBMkI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzJDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JHRDtBQUNKO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsK0NBQVE7QUFDdkIsa0JBQWtCLCtDQUFRLGtCQUFrQixJQUFJLCtDQUFRLGtCQUFrQjtBQUMxRSxlQUFlLHVEQUFPLFdBQVcsK0NBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDd0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0JjO0FBQ0k7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE1BQU07QUFDNUMsbUJBQW1CLEtBQUs7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLEtBQUs7QUFDakQscUNBQXFDLEtBQUs7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxLQUFLO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFVBQVU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxXQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsVUFBVTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxVQUFVLHVCQUF1QixVQUFVO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwrQ0FBUTtBQUN6QjtBQUNBLGVBQWUsdURBQU87QUFDdEIsMEJBQTBCLDBCQUEwQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsK0NBQVE7QUFDbkIsZ0JBQWdCLCtDQUFRO0FBQ3hCLGdCQUFnQiwrQ0FBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzhCOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEw5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdGQUF3RixNQUFNO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVitDO0FBQ087QUFDRztBQUNBO0FBQ1A7QUFDYjtBQUNyQztBQUNBO0FBQ0EsUUFBUSxrREFBTztBQUNmLGNBQWMsK0NBQVEsR0FBRztBQUN6QixFQUFFLGtEQUFVO0FBQ1osRUFBRSwrREFBWTtBQUNkLEVBQUUsc0VBQWtCO0FBQ3BCLEVBQUUsbUVBQW9CO0FBQ3RCLEVBQUUsc0VBQXNCO0FBQ3hCO0FBQ0E7QUFDb0I7Ozs7Ozs7VUNqQnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTndDO0FBQ1A7QUFDakM7QUFDQSxpREFBUTtBQUNSO0FBQ0EscURBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlEQUFRO0FBQ1osR0FBRztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2Nsb2NrLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlQXNDb21wLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlRm9vQ29tcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUhlYWRlckNvbXAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVNYWluU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2RhdGFiYXNlLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmNvbnN0IGNsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbG9ja1wiKTtcclxubGV0IG1pbGlzZWNvbmRzO1xyXG5cclxuZnVuY3Rpb24gc2V0Q2xvY2soKSB7XHJcbiAgY29uc3QgY3VycmVudFRpbWUgPSBtaWxpc2Vjb25kcztcclxuICBjb25zdCBmdWxsRGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnRUaW1lKTtcclxuXHJcbiAgbGV0IGggPSBmdWxsRGF0ZS5nZXRIb3VycygpO1xyXG4gIGxldCBtID0gZnVsbERhdGUuZ2V0TWludXRlcygpO1xyXG4gIGxldCBzID0gZnVsbERhdGUuZ2V0U2Vjb25kcygpO1xyXG5cclxuICBpZihpc05hTihtaWxpc2Vjb25kcykgfHwgbWlsaXNlY29uZHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgY2xvY2suaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGlmIChoIDwgMTApIHtcclxuICAgIGggPSBgMCR7aH1gO1xyXG4gIH1cclxuICBpZiAobSA8IDEwKSB7XHJcbiAgICBtID0gYDAke219YDtcclxuICB9XHJcbiAgaWYgKHMgPCAxMCkge1xyXG4gICAgcyA9IGAwJHtzfWA7XHJcbiAgfVxyXG4gIGNsb2NrLmlubmVyVGV4dCA9IGAke2h9OiR7bX06JHtzfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGVBcGkoKSB7XHJcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwge1xyXG4gICAgdGltZVpvbmU6IGRhdGFCYXNlLmxvY2F0aW9uLnR6X2lkLFxyXG4gICAgaG91ckN5Y2xlOiBcImgyNFwiLFxyXG4gICAgbW9udGg6IFwiMi1kaWdpdFwiLFxyXG4gICAgZGF5OiBcIjItZGlnaXRcIixcclxuICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgaG91cjogXCIyLWRpZ2l0XCIsXHJcbiAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxyXG4gICAgc2Vjb25kOiBcIjItZGlnaXRcIixcclxuICAgIGhvdXIxMjogXCJ0cnVlXCIsXHJcbiAgfSk7XHJcblxyXG4gIG1pbGlzZWNvbmRzID0gbmV3IERhdGUoZGF0ZSkuZ2V0VGltZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVNaWxpKCkge1xyXG4gIHNldENsb2NrKCk7XHJcbiAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgbWlsaXNlY29uZHMgKz0gMTAwMDtcclxuICAgIHVwZGF0ZU1pbGkoKTtcclxuICAgIHNldENsb2NrKCk7XHJcbiAgfSwgMTAwMCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgZ2V0RGF0ZUFwaSwgdXBkYXRlTWlsaSB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcblxyXG5jb25zdCBhc2lkZVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFzaWRlLXNlY3Rpb25cIik7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVBc0NvbXAoaG91ciwgaWNvbiwgdGV4dCwgdGVtcCwgY2hhbmNlUmFpbikge1xyXG4gIGNvbnN0IGFzQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBhc0NvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiYXMtY29tcFwiKTtcclxuXHJcbiAgYXNDb21wb25lbnQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJhcy1jb21wLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtY2xvY2stNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8cD4ke2hvdXJ9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcy1jb21wLWNvbnRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3RleHR9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3RlbXB9wrBDPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtcmFpbi01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5jaGFuY2Ugb2YgcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtjaGFuY2VSYWlufSU8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuXHJcbiAgYXNpZGVTZWN0aW9uLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBhc0NvbXBvbmVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckFzaWRlQ29tcG9uZW50KGluZGV4KSB7XHJcbiAgY2xlYXJBc2lkZVNlY3Rpb24oKTtcclxuICBjb25zdCBob3VycyA9IGRhdGFCYXNlLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2luZGV4XS5ob3VyO1xyXG5cclxuICBob3Vycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCBob3VyID0gZWxlbWVudC50aW1lLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgIGNvbnN0IGljb24gPSBgaHR0cHM6Ly8ke2VsZW1lbnQuY29uZGl0aW9uLmljb259YDtcclxuICAgIGNvbnN0IHRleHQgPSBlbGVtZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgY29uc3QgdGVtcCA9IGVsZW1lbnQudGVtcF9jO1xyXG4gICAgY29uc3QgY2hhbmNlUmFpbiA9IGVsZW1lbnQuY2hhbmNlX29mX3JhaW47XHJcblxyXG4gICAgY3JlYXRlQXNDb21wKGhvdXIsIGljb24sIHRleHQsIHRlbXAsIGNoYW5jZVJhaW4pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckFzaWRlU2VjdGlvbigpIHtcclxuICB3aGlsZSAoYXNpZGVTZWN0aW9uLmZpcnN0Q2hpbGQpIHtcclxuICAgIGFzaWRlU2VjdGlvbi5yZW1vdmVDaGlsZChhc2lkZVNlY3Rpb24uZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZU1haW5TZWN0aW9uXCI7XHJcbmltcG9ydCB7IHJlbmRlckFzaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4vY3JlYXRlQXNDb21wXCI7XHJcblxyXG5jb25zdCBmb290ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXItc2VjdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlckNvbXBvbmVudChkYXksIGRhdGUsIGljb24sIHRlbXAsIGNoYW5jZVJhaW4sIGlkKSB7XHJcbiAgY29uc3QgZm9vdGVyQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBmb290ZXJDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImZvby1jb21wXCIpO1xyXG4gIGZvb3RlckNvbXBvbmVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGAke2lkfWApO1xyXG5cclxuICBmb290ZXJDb21wb25lbnQuaW5uZXJIVE1MID0gYDxkaXY+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7ZGF5fTwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGxcIj4ke2RhdGV9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG5cclxuIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3RlbXB9wrBDPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5jaGFuY2Ugb2YgcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHtjaGFuY2VSYWlufSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gIGZvb3RlclNlY3Rpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGZvb3RlckNvbXBvbmVudCk7XHJcblxyXG4gIGZvb3RlckNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgaW5kZXggPSBmb290ZXJDb21wb25lbnQuZGF0YXNldC5pZDtcclxuICAgIHNldEN1cnJlbnRDb21wKCk7XHJcbiAgICByZW5kZXJNU0NvbXBvbmVudHMoaW5kZXgpO1xyXG4gICAgcmVuZGVyQXNpZGVDb21wb25lbnQoaW5kZXgpO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBzZXRDdXJyZW50Q29tcCgpIHtcclxuICAgIGZvb3RlclNlY3Rpb24uY2hpbGROb2Rlcy5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICBjaGlsZC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgIGNoaWxkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxuICAgIH0pO1xyXG4gICAgZm9vdGVyQ29tcG9uZW50LnN0eWxlLm9wYWNpdHkgPSBcIjAuNlwiO1xyXG4gICAgZm9vdGVyQ29tcG9uZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckZvb3RlckNvbXBvbmVudHMoKSB7XHJcbiAgY2xlYXJGb290ZXJTZWN0aW9uKCk7XHJcblxyXG4gIGNvbnN0IGRheXMgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcclxuICBkYXlzLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBkYXkgPSBnZXREYXkoZWxlbWVudC5kYXRlKTtcclxuICAgIGNvbnN0IGRhdGUgPSBnZXREYXRlKGVsZW1lbnQuZGF0ZSk7XHJcbiAgICBjb25zdCBpY29uID0gYGh0dHBzOi8vJHtlbGVtZW50LmRheS5jb25kaXRpb24uaWNvbn1gO1xyXG4gICAgY29uc3QgdGVtcCA9IGVsZW1lbnQuZGF5LmF2Z3RlbXBfYztcclxuICAgIGNvbnN0IGNoYW5jZVJhaW4gPSBlbGVtZW50LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcclxuXHJcbiAgICBjcmVhdGVGb290ZXJDb21wb25lbnQoZGF5LCBkYXRlLCBpY29uLCB0ZW1wLCBjaGFuY2VSYWluLCBpbmRleCk7XHJcbiAgfSk7XHJcblxyXG4gIGluaXRDdXJyZW50KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRm9vdGVyU2VjdGlvbigpIHtcclxuICB3aGlsZSAoZm9vdGVyU2VjdGlvbi5maXJzdENoaWxkKSB7XHJcbiAgICBmb290ZXJTZWN0aW9uLnJlbW92ZUNoaWxkKGZvb3RlclNlY3Rpb24uZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q3VycmVudCgpIHtcclxuICBjb25zdCBpbml0ID0gZm9vdGVyU2VjdGlvbi5jaGlsZE5vZGVzWzBdO1xyXG4gIGluaXQuc3R5bGUub3BhY2l0eSA9IFwiMC42XCI7XHJcbiAgaW5pdC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGUoZGF0ZSkge1xyXG4gIGNvbnN0IGZ1bGxEYXRlID0gZGF0ZS5zcGxpdChcIi1cIik7XHJcblxyXG4gIGNvbnN0IGRheSA9IGZ1bGxEYXRlWzJdO1xyXG4gIGNvbnN0IG1vbnRoID0gZnVsbERhdGVbMV07XHJcbiAgY29uc3QgeWVhciA9IGZ1bGxEYXRlWzBdO1xyXG5cclxuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5KGRhdGUpIHtcclxuICBjb25zdCB3ZWVrID0gW1wiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCIsIFwiU3VuXCJdO1xyXG4gIGNvbnN0IHdlZWtEYXkgPSBuZXcgRGF0ZShkYXRlKS5nZXREYXkoKTtcclxuICBjb25zdCBkYXkgPSB3ZWVrW3dlZWtEYXldO1xyXG5cclxuICByZXR1cm4gZGF5O1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJGb290ZXJDb21wb25lbnRzLCBnZXREYXRlIH07XHJcbiIsImltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmZ1bmN0aW9uIHNldEhlYWRlckluZm8obmFtZSwgc3VidCwgZGF0ZSkge1xyXG4gIGNvbnN0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3VycmVudC1jaXR5XCIpO1xyXG4gIGNvbnN0IHN1YnRUdGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lvbi1jb3VudHJ5XCIpO1xyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50LWRhdGVcIik7XHJcblxyXG4gIG1haW5UaXRsZS5pbm5lclRleHQgPSBuYW1lO1xyXG4gIHN1YnRUdGwuaW5uZXJUZXh0ID0gc3VidDtcclxuICBjdXJyZW50RGF0ZS5pbm5lclRleHQgPSBkYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzcGxpdERhdGUoZGF0ZSkge1xyXG4gICAgY29uc3QgYXJEYXRlID0gZGF0ZS5zcGxpdChcIiBcIik7XHJcblxyXG4gICAgcmV0dXJuIGFyRGF0ZVswXTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySGVhZGVyKCkge1xyXG4gIGNvbnN0IG5hbWUgPSBkYXRhQmFzZS5sb2NhdGlvbi5uYW1lO1xyXG4gIGNvbnN0IHN1YnQgPSBgJHtkYXRhQmFzZS5sb2NhdGlvbi5yZWdpb259IC0gJHtkYXRhQmFzZS5sb2NhdGlvbi5jb3VudHJ5fWA7XHJcbiAgY29uc3QgZGF0ZSA9IGdldERhdGUoc3BsaXREYXRlKGRhdGFCYXNlLmxvY2F0aW9uLmxvY2FsdGltZSkpO1xyXG5cclxuICBzZXRIZWFkZXJJbmZvKG5hbWUsIHN1YnQsIGRhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJIZWFkZXIgfTtcclxuIiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBnZXREYXRlIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5cclxuY29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1TQ29tcG9uZW50cyhcclxuICB0aXRsZSxcclxuICBkYXRlLFxyXG4gIGljb24sXHJcbiAgdGV4dCxcclxuICB0ZW1wLFxyXG4gIGZlZWxzTGlrZSxcclxuICBtYXhUZW1wLFxyXG4gIG1pblRlbXAsXHJcbiAgY2hhbmNlUmFpbixcclxuICBwcmVjaXBpdGF0aW9uLFxyXG4gIHdpbmRTcGVlZCxcclxuICBodW1pZGl0eSxcclxuICBzdW5yaXNlLFxyXG4gIHN1bnNldFxyXG4pIHtcclxuICBtYWluU2VjdGlvbi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIndyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxoMSBjbGFzcz1cIm1haW4tc3VidFwiPiR7dGl0bGV9PC9oMT5cclxuICAgICAgICAgICAgICA8cD4ke2RhdGV9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHt0ZXh0fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3ItY29udGVudFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmZlZWxzIGxpa2U8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2ZlZWxzTGlrZX08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItdXAtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5tYXg8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke21heFRlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci1kb3duLTUwLnBuZ1wiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5taW48L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke21pblRlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5jaGFuY2Ugb2YgcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWh5Z3JvbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5wcmVjaXBpdGF0aW9uPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtwcmVjaXBpdGF0aW9ufTxzcGFuIGNsYXNzPVwiX3NtYWxsXCI+bW08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXdpbmQtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj53aW5kIHNwZWVkPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt3aW5kU3BlZWR9PHNwYW4gY2xhc3M9XCJfc21hbGxcIj5rbS9oPC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1kcm9wLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+aHVtaWRpdHk8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2h1bWlkaXR5fSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtc3VucmlzZS01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnN1bnJpc2U8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7c3VucmlzZX08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtc3Vuc2V0LTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+c3Vuc2V0PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3N1bnNldH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5KGRhdGUpIHtcclxuICBjb25zdCB3ZWVrID0gW1xyXG4gICAgXCJNb25kYXlcIixcclxuICAgIFwiVHVlc2RheVwiLFxyXG4gICAgXCJXZWRuZXNkYXlcIixcclxuICAgIFwiVGh1cnNkYXlcIixcclxuICAgIFwiRnJpZGF5XCIsXHJcbiAgICBcIlNhdHVyZGF5XCIsXHJcbiAgICBcIlN1bmRheVwiLFxyXG4gIF07XHJcbiAgY29uc3Qgd2Vla0RheSA9IG5ldyBEYXRlKGRhdGUpLmdldERheSgpO1xyXG4gIGNvbnN0IGRheSA9IHdlZWtbd2Vla0RheV07XHJcblxyXG4gIHJldHVybiBkYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEhvdXIoaG91cikge1xyXG4gIGNvbnN0IGFySG91ciA9IGhvdXIuc3BsaXQoXCIgXCIpO1xyXG4gIHJldHVybiBgJHthckhvdXJbMF19PHNwYW4gY2xhc3M9XCJfc21hbGxcIj4ke2FySG91clsxXX08L3NwYW4+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyTVNDb21wb25lbnRzKGluZGV4KSB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaW5kZXhdO1xyXG4gIGNvbnN0IHRpdGxlID0gZ2V0RGF5KHRhcmdldC5kYXRlKTtcclxuICBjb25zdCBkYXRlID0gZ2V0RGF0ZSh0YXJnZXQuZGF0ZSk7XHJcbiAgY29uc3QgaWNvbiA9IGBodHRwczovLyR7dGFyZ2V0LmRheS5jb25kaXRpb24uaWNvbn1gO1xyXG4gIGNvbnN0IHRleHQgPSB0YXJnZXQuZGF5LmNvbmRpdGlvbi50ZXh0O1xyXG4gIGxldCB0ZW1wID0gdGFyZ2V0LmRheS5hdmd0ZW1wX2M7XHJcbiAgbGV0IGZlZWxzTGlrZSA9IFwiLS8tXCI7XHJcbiAgY29uc3QgbWF4VGVtcCA9IHRhcmdldC5kYXkubWF4dGVtcF9jO1xyXG4gIGNvbnN0IG1pblRlbXAgPSB0YXJnZXQuZGF5Lm1pbnRlbXBfYztcclxuICBjb25zdCBjaGFuY2VSYWluID0gdGFyZ2V0LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcclxuICBjb25zdCBwcmVjaXBpdGF0aW9uID0gdGFyZ2V0LmRheS50b3RhbHByZWNpcF9tbTtcclxuICBsZXQgd2luZFNwZWVkID0gXCItLy1cIjtcclxuICBjb25zdCBodW1pZGl0eSA9IHRhcmdldC5kYXkuYXZnaHVtaWRpdHk7XHJcbiAgY29uc3Qgc3VucmlzZSA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnJpc2UpO1xyXG4gIGNvbnN0IHN1bnNldCA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnNldCk7XHJcblxyXG4gIGlmIChpbmRleCA9PT0gXCIwXCIpIHtcclxuICAgIHRlbXAgPSBkYXRhQmFzZS5jdXJyZW50LnRlbXBfYztcclxuICAgIGZlZWxzTGlrZSA9IGRhdGFCYXNlLmN1cnJlbnQuZmVlbHNsaWtlX2M7XHJcbiAgICB3aW5kU3BlZWQgPSBkYXRhQmFzZS5jdXJyZW50LndpbmRfa3BoO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTVNDb21wb25lbnRzKFxyXG4gICAgdGl0bGUsXHJcbiAgICBkYXRlLFxyXG4gICAgaWNvbixcclxuICAgIHRleHQsXHJcbiAgICB0ZW1wLFxyXG4gICAgZmVlbHNMaWtlLFxyXG4gICAgbWF4VGVtcCxcclxuICAgIG1pblRlbXAsXHJcbiAgICBjaGFuY2VSYWluLFxyXG4gICAgcHJlY2lwaXRhdGlvbixcclxuICAgIHdpbmRTcGVlZCxcclxuICAgIGh1bWlkaXR5LFxyXG4gICAgc3VucmlzZSxcclxuICAgIHN1bnNldFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9O1xyXG4iLCJsZXQgZGF0YUJhc2U7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXREYXRhKHZhbHVlKSB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgIGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWM1NWViZjg5NWRhODQ5Njk5MWYyMjIwNDIyMzE4MDkmcT0ke3ZhbHVlfSZkYXlzPTEwJmFxaT1ubyZhbGVydHM9bm9gXHJcbiAgKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICBkYXRhQmFzZSA9IGRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB7ZGF0YUJhc2UsIGdldERhdGF9IiwiaW1wb3J0IHsgZGF0YUJhc2UsIGdldERhdGEgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9IGZyb20gXCIuL2NyZWF0ZUFzQ29tcFwiO1xyXG5pbXBvcnQgeyByZW5kZXJGb290ZXJDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5pbXBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVNYWluU2VjdGlvblwiO1xyXG5pbXBvcnQgeyByZW5kZXJIZWFkZXIgfSBmcm9tIFwiLi9jcmVhdGVIZWFkZXJDb21wXCI7XHJcbmltcG9ydCB7IGdldERhdGVBcGkgfSBmcm9tIFwiLi9jbG9ja1wiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZG9UaGluZ3ModmFsdWUpIHtcclxuICBhd2FpdCBnZXREYXRhKHZhbHVlKTtcclxuICBjb25zb2xlLmxvZyhkYXRhQmFzZSk7IC8vZGlzcGxheSB0aGluZ3MgLT4gd2FpdCBmb3IgZGF0YVxyXG4gIGdldERhdGVBcGkoKTtcclxuICByZW5kZXJIZWFkZXIoKTtcclxuICByZW5kZXJNU0NvbXBvbmVudHMoXCIwXCIpO1xyXG4gIHJlbmRlckFzaWRlQ29tcG9uZW50KFwiMFwiKTtcclxuICByZW5kZXJGb290ZXJDb21wb25lbnRzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvVGhpbmdzIH07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgdXBkYXRlTWlsaSB9IGZyb20gXCIuL2Nsb2NrLmpzXCI7XHJcbmltcG9ydCB7ZG9UaGluZ3N9IGZyb20gXCIuL2RvbS5qc1wiXHJcblxyXG5kb1RoaW5ncyhcImxvbmRvblwiKTtcclxuc2VhcmNoT25DbGljaygpO1xyXG51cGRhdGVNaWxpKCk7XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hPbkNsaWNrKCkge1xyXG4gIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIik7XHJcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5cIik7XHJcblxyXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9UaGluZ3Moc2VhcmNoSW5wdXQudmFsdWUpO1xyXG4gIH0pO1xyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9