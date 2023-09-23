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
/* harmony export */   miliseconds: () => (/* binding */ miliseconds),
/* harmony export */   updateClock: () => (/* binding */ updateClock)
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
  setTimeout(() => {
    miliseconds += 1000;
    updateMili();
    setClock();
  }, 1000);
}

function updateClock() {
  getDateApi();
  updateMili();
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
                <p class="_medium">${text}</p>
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
    const hours = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.forecast.forecastday[index].hour;

    hours.forEach(element => {
        const hour = element.time.split(" ")[1];
        const icon = element.condition.icon;
        const text = element.condition.text;
        const temp = element.temp_c;
        const chanceRain = element.chance_of_rain;

        createAsComp(hour, icon, text, temp, chanceRain)
    });
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
  const fullDate = new Date(date);
  let day = fullDate.getDate();
  let month = fullDate.getMonth();
  const year = fullDate.getFullYear();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${month}/${day}/${year}`;
}

function getDay(date) {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDay = new Date(date).getDay();
  const day = week[weekDay];

  return day;
}

function renderFooterComponents() {
  const days = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.forecast.forecastday;

  days.forEach((element) => {
    const day = getDay(element.date);
    const date = getDate(element.date);
    const icon = element.day.condition.icon;
    const temp = element.day.avgtemp_c;
    const chanceRain = element.day.daily_chance_of_rain;

    createFooterComponent(day, date, icon, temp, chanceRain);
  });
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
/* harmony import */ var _clock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clock */ "./src/clock.js");
/* harmony import */ var _createFooComp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createFooComp */ "./src/createFooComp.js");
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./database */ "./src/database.js");




function setHeaderInfo(name, subt, date) {
  const mainTitle = document.querySelector("#current-city");
  const subtTtl = document.querySelector("#region-country");
  const currentDate = document.querySelector("#current-date");

  mainTitle.innerText = name;
  subtTtl.innerText = subt;
  currentDate.innerText = date;
}


function renderHeader() {
  const name = _database__WEBPACK_IMPORTED_MODULE_2__.dataBase.location.name;
  const subt = `${_database__WEBPACK_IMPORTED_MODULE_2__.dataBase.location.region} - ${_database__WEBPACK_IMPORTED_MODULE_2__.dataBase.location.country}`;
  const date = (0,_createFooComp__WEBPACK_IMPORTED_MODULE_1__.getDate)(_database__WEBPACK_IMPORTED_MODULE_2__.dataBase.location.localtime);

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
              <p class="_medium">${text}</p>
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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDay = new Date(date).getDay();
  const day = week[weekDay];

  return day;
}

function setHour(hour) {
    const arHour = hour.split(" ");
    return `${arHour[0]}<span class="_small">${arHour[1]}</span>`;
}

function renderMSComponents() {
  const target = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.forecast.forecastday[0];
  const title = getDay(target.date);
  const date = (0,_createFooComp__WEBPACK_IMPORTED_MODULE_1__.getDate)(target.date);
  const icon = target.day.condition.icon;
  const text = target.day.condition.text;
  const temp = target.day.avgtemp_c;
  const feelsLike = "-/-";
  const maxTemp = target.day.maxtemp_c;
  const minTemp = target.day.mintemp_c;
  const chanceRain = target.day.daily_chance_of_rain;
  const precipitation = target.day.totalprecip_mm;
  const windSpeed = "-/-";
  const humidity = target.day.avghumidity;
  const sunrise = setHour(target.astro.sunrise);
  const sunset = setHour(target.astro.sunset);

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







async function doThings() {
  console.log(_database__WEBPACK_IMPORTED_MODULE_0__.dataBase); //display things -> wait for data
  (0,_clock__WEBPACK_IMPORTED_MODULE_5__.updateClock)();
  (0,_createHeaderComp__WEBPACK_IMPORTED_MODULE_4__.renderHeader)();
  (0,_createMainSection__WEBPACK_IMPORTED_MODULE_3__.renderMSComponents)();
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
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database */ "./src/database.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");



async function thing() {
    await (0,_database__WEBPACK_IMPORTED_MODULE_0__.getData)("maracanau");
    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.doThings)();
}

thing();




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0ZBQXdGLE1BQU07QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWc0M7QUFDYztBQUNLO0FBQ0E7QUFDUDtBQUNaO0FBQ3RDO0FBQ0E7QUFDQSxjQUFjLCtDQUFRLEdBQUc7QUFDekIsRUFBRSxtREFBVztBQUNiLEVBQUUsK0RBQVk7QUFDZCxFQUFFLHNFQUFrQjtBQUNwQixFQUFFLG1FQUFvQjtBQUN0QixFQUFFLHNFQUFzQjtBQUN4QjtBQUNBO0FBQ29COzs7Ozs7O1VDaEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05xQztBQUNKO0FBQ2pDO0FBQ0E7QUFDQSxVQUFVLGtEQUFPO0FBQ2pCLElBQUksOENBQVE7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2Nsb2NrLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlQXNDb21wLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlRm9vQ29tcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUhlYWRlckNvbXAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVNYWluU2VjdGlvbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2RhdGFiYXNlLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmNvbnN0IGNsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbG9ja1wiKTtcclxubGV0IG1pbGlzZWNvbmRzO1xyXG5cclxuZnVuY3Rpb24gc2V0Q2xvY2soKSB7XHJcbiAgY29uc3QgY3VycmVudFRpbWUgPSBtaWxpc2Vjb25kcztcclxuICBjb25zdCBmdWxsRGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnRUaW1lKTtcclxuXHJcbiAgbGV0IGggPSBmdWxsRGF0ZS5nZXRIb3VycygpO1xyXG4gIGxldCBtID0gZnVsbERhdGUuZ2V0TWludXRlcygpO1xyXG4gIGxldCBzID0gZnVsbERhdGUuZ2V0U2Vjb25kcygpO1xyXG5cclxuICBpZiAoaCA8IDEwKSB7XHJcbiAgICBoID0gYDAke2h9YDtcclxuICB9XHJcbiAgaWYgKG0gPCAxMCkge1xyXG4gICAgbSA9IGAwJHttfWA7XHJcbiAgfVxyXG4gIGlmIChzIDwgMTApIHtcclxuICAgIHMgPSBgMCR7c31gO1xyXG4gIH1cclxuICBjbG9jay5pbm5lclRleHQgPSBgJHtofToke219OiR7c31gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlQXBpKCkge1xyXG4gIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIHtcclxuICAgIHRpbWVab25lOiBkYXRhQmFzZS5sb2NhdGlvbi50el9pZCxcclxuICAgIGhvdXJDeWNsZTogXCJoMjRcIixcclxuICAgIG1vbnRoOiBcIjItZGlnaXRcIixcclxuICAgIGRheTogXCIyLWRpZ2l0XCIsXHJcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxyXG4gICAgbWludXRlOiBcIjItZGlnaXRcIixcclxuICAgIHNlY29uZDogXCIyLWRpZ2l0XCIsXHJcbiAgICBob3VyMTI6IFwidHJ1ZVwiLFxyXG4gIH0pO1xyXG5cclxuICBtaWxpc2Vjb25kcyA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTWlsaSgpIHtcclxuICBzZXRDbG9jaygpO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgbWlsaXNlY29uZHMgKz0gMTAwMDtcclxuICAgIHVwZGF0ZU1pbGkoKTtcclxuICAgIHNldENsb2NrKCk7XHJcbiAgfSwgMTAwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUNsb2NrKCkge1xyXG4gIGdldERhdGVBcGkoKTtcclxuICB1cGRhdGVNaWxpKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHVwZGF0ZUNsb2NrLCBtaWxpc2Vjb25kcyB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcblxyXG5jb25zdCBhc2lkZVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFzaWRlLXNlY3Rpb25cIik7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVBc0NvbXAoaG91ciwgaWNvbiwgdGV4dCwgdGVtcCwgY2hhbmNlUmFpbikge1xyXG4gIGNvbnN0IGFzQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBhc0NvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiYXMtY29tcFwiKTtcclxuXHJcbiAgYXNDb21wb25lbnQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJhcy1jb21wLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtY2xvY2stNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8cD4ke2hvdXJ9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcy1jb21wLWNvbnRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZXh0fTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj50ZW1wZXJhdHVyZTwvcD5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZW1wfcKwQzwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gIGFzaWRlU2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgYXNDb21wb25lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJBc2lkZUNvbXBvbmVudChpbmRleCkge1xyXG4gICAgY29uc3QgaG91cnMgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpbmRleF0uaG91cjtcclxuXHJcbiAgICBob3Vycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhvdXIgPSBlbGVtZW50LnRpbWUuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgICAgIGNvbnN0IGljb24gPSBlbGVtZW50LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSBlbGVtZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgICAgIGNvbnN0IHRlbXAgPSBlbGVtZW50LnRlbXBfYztcclxuICAgICAgICBjb25zdCBjaGFuY2VSYWluID0gZWxlbWVudC5jaGFuY2Vfb2ZfcmFpbjtcclxuXHJcbiAgICAgICAgY3JlYXRlQXNDb21wKGhvdXIsIGljb24sIHRleHQsIHRlbXAsIGNoYW5jZVJhaW4pXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHtyZW5kZXJBc2lkZUNvbXBvbmVudH1cclxuIiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuY29uc3QgZm9vdGVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyLXNlY3Rpb25cIik7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb290ZXJDb21wb25lbnQoZGF5LCBkYXRlLCBpY29uLCB0ZW1wLCBjaGFuY2VSYWluKSB7XHJcbiAgY29uc3QgZm9vdGVyQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBmb290ZXJDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImZvby1jb21wXCIpO1xyXG5cclxuICBmb290ZXJDb21wb25lbnQuaW5uZXJIVE1MID0gYDxkaXY+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7ZGF5fTwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGxcIj4ke2RhdGV9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+dGVtcGVyYXR1cmU8L3A+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZW1wfcKwQzwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtcmFpbi01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtjaGFuY2VSYWlufSU8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxuXHJcbiAgZm9vdGVyU2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZm9vdGVyQ29tcG9uZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0ZShkYXRlKSB7XHJcbiAgY29uc3QgZnVsbERhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICBsZXQgZGF5ID0gZnVsbERhdGUuZ2V0RGF0ZSgpO1xyXG4gIGxldCBtb250aCA9IGZ1bGxEYXRlLmdldE1vbnRoKCk7XHJcbiAgY29uc3QgeWVhciA9IGZ1bGxEYXRlLmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gIGlmIChtb250aCA8IDEwKSB7XHJcbiAgICBtb250aCA9IGAwJHttb250aH1gO1xyXG4gIH1cclxuICBpZiAoZGF5IDwgMTApIHtcclxuICAgIGRheSA9IGAwJHtkYXl9YDtcclxuICB9XHJcblxyXG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXkoZGF0ZSkge1xyXG4gIGNvbnN0IHdlZWsgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl07XHJcbiAgY29uc3Qgd2Vla0RheSA9IG5ldyBEYXRlKGRhdGUpLmdldERheSgpO1xyXG4gIGNvbnN0IGRheSA9IHdlZWtbd2Vla0RheV07XHJcblxyXG4gIHJldHVybiBkYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckZvb3RlckNvbXBvbmVudHMoKSB7XHJcbiAgY29uc3QgZGF5cyA9IGRhdGFCYXNlLmZvcmVjYXN0LmZvcmVjYXN0ZGF5O1xyXG5cclxuICBkYXlzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IGRheSA9IGdldERheShlbGVtZW50LmRhdGUpO1xyXG4gICAgY29uc3QgZGF0ZSA9IGdldERhdGUoZWxlbWVudC5kYXRlKTtcclxuICAgIGNvbnN0IGljb24gPSBlbGVtZW50LmRheS5jb25kaXRpb24uaWNvbjtcclxuICAgIGNvbnN0IHRlbXAgPSBlbGVtZW50LmRheS5hdmd0ZW1wX2M7XHJcbiAgICBjb25zdCBjaGFuY2VSYWluID0gZWxlbWVudC5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XHJcblxyXG4gICAgY3JlYXRlRm9vdGVyQ29tcG9uZW50KGRheSwgZGF0ZSwgaWNvbiwgdGVtcCwgY2hhbmNlUmFpbik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlckZvb3RlckNvbXBvbmVudHMsIGdldERhdGUgfTtcclxuIiwiaW1wb3J0IHsgbWlsaXNlY29uZHMgfSBmcm9tIFwiLi9jbG9ja1wiO1xyXG5pbXBvcnQgeyBnZXREYXRlIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5pbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcblxyXG5mdW5jdGlvbiBzZXRIZWFkZXJJbmZvKG5hbWUsIHN1YnQsIGRhdGUpIHtcclxuICBjb25zdCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnQtY2l0eVwiKTtcclxuICBjb25zdCBzdWJ0VHRsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpb24tY291bnRyeVwiKTtcclxuICBjb25zdCBjdXJyZW50RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3VycmVudC1kYXRlXCIpO1xyXG5cclxuICBtYWluVGl0bGUuaW5uZXJUZXh0ID0gbmFtZTtcclxuICBzdWJ0VHRsLmlubmVyVGV4dCA9IHN1YnQ7XHJcbiAgY3VycmVudERhdGUuaW5uZXJUZXh0ID0gZGF0ZTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckhlYWRlcigpIHtcclxuICBjb25zdCBuYW1lID0gZGF0YUJhc2UubG9jYXRpb24ubmFtZTtcclxuICBjb25zdCBzdWJ0ID0gYCR7ZGF0YUJhc2UubG9jYXRpb24ucmVnaW9ufSAtICR7ZGF0YUJhc2UubG9jYXRpb24uY291bnRyeX1gO1xyXG4gIGNvbnN0IGRhdGUgPSBnZXREYXRlKGRhdGFCYXNlLmxvY2F0aW9uLmxvY2FsdGltZSk7XHJcblxyXG4gIHNldEhlYWRlckluZm8obmFtZSwgc3VidCwgZGF0ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlckhlYWRlciB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcblxyXG5jb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlTVNDb21wb25lbnRzKFxyXG4gIHRpdGxlLFxyXG4gIGRhdGUsXHJcbiAgaWNvbixcclxuICB0ZXh0LFxyXG4gIHRlbXAsXHJcbiAgZmVlbHNMaWtlLFxyXG4gIG1heFRlbXAsXHJcbiAgbWluVGVtcCxcclxuICBjaGFuY2VSYWluLFxyXG4gIHByZWNpcGl0YXRpb24sXHJcbiAgd2luZFNwZWVkLFxyXG4gIGh1bWlkaXR5LFxyXG4gIHN1bnJpc2UsXHJcbiAgc3Vuc2V0XHJcbikge1xyXG4gIG1haW5TZWN0aW9uLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwid3ItaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGgxIGNsYXNzPVwibWFpbi1zdWJ0XCI+JHt0aXRsZX08L2gxPlxyXG4gICAgICAgICAgICAgIDxwPiR7ZGF0ZX08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibWFpbi1pY29uXCIgc3JjPVwiJHtpY29ufVwiIC8+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZXh0fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3ItY29udGVudFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmZlZWxzIGxpa2U8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2ZlZWxzTGlrZX08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItdXAtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5tYXg8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke21heFRlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci1kb3duLTUwLnBuZ1wiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5taW48L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke21pblRlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5jaGFuY2Ugb2YgcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWh5Z3JvbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5wcmVjaXBpdGF0aW9uPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtwcmVjaXBpdGF0aW9ufTxzcGFuIGNsYXNzPVwiX3NtYWxsXCI+bW08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXdpbmQtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj53aW5kIHNwZWVkPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt3aW5kU3BlZWR9PHNwYW4gY2xhc3M9XCJfc21hbGxcIj5rbS9oPC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1kcm9wLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+aHVtaWRpdHk8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2h1bWlkaXR5fSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtc3VucmlzZS01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnN1bnJpc2U8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7c3VucmlzZX08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtc3Vuc2V0LTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+c3Vuc2V0PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3N1bnNldH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5KGRhdGUpIHtcclxuICBjb25zdCB3ZWVrID0gW1xyXG4gICAgXCJTdW5kYXlcIixcclxuICAgIFwiTW9uZGF5XCIsXHJcbiAgICBcIlR1ZXNkYXlcIixcclxuICAgIFwiV2VkbmVzZGF5XCIsXHJcbiAgICBcIlRodXJzZGF5XCIsXHJcbiAgICBcIkZyaWRheVwiLFxyXG4gICAgXCJTYXR1cmRheVwiLFxyXG4gIF07XHJcbiAgY29uc3Qgd2Vla0RheSA9IG5ldyBEYXRlKGRhdGUpLmdldERheSgpO1xyXG4gIGNvbnN0IGRheSA9IHdlZWtbd2Vla0RheV07XHJcblxyXG4gIHJldHVybiBkYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEhvdXIoaG91cikge1xyXG4gICAgY29uc3QgYXJIb3VyID0gaG91ci5zcGxpdChcIiBcIik7XHJcbiAgICByZXR1cm4gYCR7YXJIb3VyWzBdfTxzcGFuIGNsYXNzPVwiX3NtYWxsXCI+JHthckhvdXJbMV19PC9zcGFuPmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlck1TQ29tcG9uZW50cygpIHtcclxuICBjb25zdCB0YXJnZXQgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXTtcclxuICBjb25zdCB0aXRsZSA9IGdldERheSh0YXJnZXQuZGF0ZSk7XHJcbiAgY29uc3QgZGF0ZSA9IGdldERhdGUodGFyZ2V0LmRhdGUpO1xyXG4gIGNvbnN0IGljb24gPSB0YXJnZXQuZGF5LmNvbmRpdGlvbi5pY29uO1xyXG4gIGNvbnN0IHRleHQgPSB0YXJnZXQuZGF5LmNvbmRpdGlvbi50ZXh0O1xyXG4gIGNvbnN0IHRlbXAgPSB0YXJnZXQuZGF5LmF2Z3RlbXBfYztcclxuICBjb25zdCBmZWVsc0xpa2UgPSBcIi0vLVwiO1xyXG4gIGNvbnN0IG1heFRlbXAgPSB0YXJnZXQuZGF5Lm1heHRlbXBfYztcclxuICBjb25zdCBtaW5UZW1wID0gdGFyZ2V0LmRheS5taW50ZW1wX2M7XHJcbiAgY29uc3QgY2hhbmNlUmFpbiA9IHRhcmdldC5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XHJcbiAgY29uc3QgcHJlY2lwaXRhdGlvbiA9IHRhcmdldC5kYXkudG90YWxwcmVjaXBfbW07XHJcbiAgY29uc3Qgd2luZFNwZWVkID0gXCItLy1cIjtcclxuICBjb25zdCBodW1pZGl0eSA9IHRhcmdldC5kYXkuYXZnaHVtaWRpdHk7XHJcbiAgY29uc3Qgc3VucmlzZSA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnJpc2UpO1xyXG4gIGNvbnN0IHN1bnNldCA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnNldCk7XHJcblxyXG4gIGNyZWF0ZU1TQ29tcG9uZW50cyhcclxuICAgIHRpdGxlLFxyXG4gICAgZGF0ZSxcclxuICAgIGljb24sXHJcbiAgICB0ZXh0LFxyXG4gICAgdGVtcCxcclxuICAgIGZlZWxzTGlrZSxcclxuICAgIG1heFRlbXAsXHJcbiAgICBtaW5UZW1wLFxyXG4gICAgY2hhbmNlUmFpbixcclxuICAgIHByZWNpcGl0YXRpb24sXHJcbiAgICB3aW5kU3BlZWQsXHJcbiAgICBodW1pZGl0eSxcclxuICAgIHN1bnJpc2UsXHJcbiAgICBzdW5zZXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfTtcclxuIiwibGV0IGRhdGFCYXNlO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YSh2YWx1ZSkge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1jNTVlYmY4OTVkYTg0OTY5OTFmMjIyMDQyMjMxODA5JnE9JHt2YWx1ZX0mZGF5cz0xMCZhcWk9bm8mYWxlcnRzPW5vYFxyXG4gICk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgZGF0YUJhc2UgPSBkYXRhO1xyXG59XHJcblxyXG5leHBvcnQge2RhdGFCYXNlLCBnZXREYXRhfSIsImltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHtyZW5kZXJBc2lkZUNvbXBvbmVudH0gZnJvbSBcIi4vY3JlYXRlQXNDb21wXCI7XHJcbmltcG9ydCB7IHJlbmRlckZvb3RlckNvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZU1haW5TZWN0aW9uXCI7XHJcbmltcG9ydCB7IHJlbmRlckhlYWRlciB9IGZyb20gXCIuL2NyZWF0ZUhlYWRlckNvbXBcIjtcclxuaW1wb3J0IHsgdXBkYXRlQ2xvY2sgfSBmcm9tIFwiLi9jbG9ja1wiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZG9UaGluZ3MoKSB7XHJcbiAgY29uc29sZS5sb2coZGF0YUJhc2UpOyAvL2Rpc3BsYXkgdGhpbmdzIC0+IHdhaXQgZm9yIGRhdGFcclxuICB1cGRhdGVDbG9jaygpO1xyXG4gIHJlbmRlckhlYWRlcigpO1xyXG4gIHJlbmRlck1TQ29tcG9uZW50cygpO1xyXG4gIHJlbmRlckFzaWRlQ29tcG9uZW50KFwiMFwiKTtcclxuICByZW5kZXJGb290ZXJDb21wb25lbnRzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvVGhpbmdzIH07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IGRvVGhpbmdzIH0gZnJvbSBcIi4vZG9tXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiB0aGluZygpIHtcclxuICAgIGF3YWl0IGdldERhdGEoXCJtYXJhY2FuYXVcIik7XHJcbiAgICBkb1RoaW5ncygpO1xyXG59XHJcblxyXG50aGluZygpO1xyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=