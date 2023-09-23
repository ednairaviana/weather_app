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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVnNDO0FBQ2M7QUFDSztBQUNBO0FBQ1A7QUFDWjtBQUN0QztBQUNBO0FBQ0EsY0FBYywrQ0FBUSxHQUFHO0FBQ3pCLEVBQUUsbURBQVc7QUFDYixFQUFFLCtEQUFZO0FBQ2QsRUFBRSxzRUFBa0I7QUFDcEIsRUFBRSxtRUFBb0I7QUFDdEIsRUFBRSxzRUFBc0I7QUFDeEI7QUFDQTtBQUNvQjs7Ozs7OztVQ2hCcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOcUM7QUFDSjtBQUNqQztBQUNBO0FBQ0EsVUFBVSxrREFBTztBQUNqQixJQUFJLDhDQUFRO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jbG9jay5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUFzQ29tcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUZvb0NvbXAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVIZWFkZXJDb21wLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlTWFpblNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9kYXRhYmFzZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcblxyXG5jb25zdCBjbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvY2tcIik7XHJcbmxldCBtaWxpc2Vjb25kcztcclxuXHJcbmZ1bmN0aW9uIHNldENsb2NrKCkge1xyXG4gIGNvbnN0IGN1cnJlbnRUaW1lID0gbWlsaXNlY29uZHM7XHJcbiAgY29uc3QgZnVsbERhdGUgPSBuZXcgRGF0ZShjdXJyZW50VGltZSk7XHJcblxyXG4gIGxldCBoID0gZnVsbERhdGUuZ2V0SG91cnMoKTtcclxuICBsZXQgbSA9IGZ1bGxEYXRlLmdldE1pbnV0ZXMoKTtcclxuICBsZXQgcyA9IGZ1bGxEYXRlLmdldFNlY29uZHMoKTtcclxuXHJcbiAgaWYgKGggPCAxMCkge1xyXG4gICAgaCA9IGAwJHtofWA7XHJcbiAgfVxyXG4gIGlmIChtIDwgMTApIHtcclxuICAgIG0gPSBgMCR7bX1gO1xyXG4gIH1cclxuICBpZiAocyA8IDEwKSB7XHJcbiAgICBzID0gYDAke3N9YDtcclxuICB9XHJcbiAgY2xvY2suaW5uZXJUZXh0ID0gYCR7aH06JHttfToke3N9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0ZUFwaSgpIHtcclxuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7XHJcbiAgICB0aW1lWm9uZTogZGF0YUJhc2UubG9jYXRpb24udHpfaWQsXHJcbiAgICBob3VyQ3ljbGU6IFwiaDI0XCIsXHJcbiAgICBtb250aDogXCIyLWRpZ2l0XCIsXHJcbiAgICBkYXk6IFwiMi1kaWdpdFwiLFxyXG4gICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICBob3VyOiBcIjItZGlnaXRcIixcclxuICAgIG1pbnV0ZTogXCIyLWRpZ2l0XCIsXHJcbiAgICBzZWNvbmQ6IFwiMi1kaWdpdFwiLFxyXG4gICAgaG91cjEyOiBcInRydWVcIixcclxuICB9KTtcclxuXHJcbiAgbWlsaXNlY29uZHMgPSBuZXcgRGF0ZShkYXRlKS5nZXRUaW1lKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU1pbGkoKSB7XHJcbiAgc2V0Q2xvY2soKTtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIG1pbGlzZWNvbmRzICs9IDEwMDA7XHJcbiAgICB1cGRhdGVNaWxpKCk7XHJcbiAgICBzZXRDbG9jaygpO1xyXG4gIH0sIDEwMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDbG9jaygpIHtcclxuICBnZXREYXRlQXBpKCk7XHJcbiAgdXBkYXRlTWlsaSgpO1xyXG59XHJcblxyXG5leHBvcnQgeyB1cGRhdGVDbG9jaywgbWlsaXNlY29uZHMgfTtcclxuIiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuY29uc3QgYXNpZGVTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hc2lkZS1zZWN0aW9uXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQXNDb21wKGhvdXIsIGljb24sIHRleHQsIHRlbXAsIGNoYW5jZVJhaW4pIHtcclxuICBjb25zdCBhc0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYXNDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImFzLWNvbXBcIik7XHJcblxyXG4gIGFzQ29tcG9uZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiYXMtY29tcC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWNsb2NrLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPHA+JHtob3VyfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXMtY29tcC1jb250XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtYWluLWljb25cIiBzcmM9XCIke2ljb259XCIgLz5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7dGV4dH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+dGVtcGVyYXR1cmU8L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7dGVtcH3CsEM8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1yYWluLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmNoYW5jZSBvZiByYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2NoYW5jZVJhaW59JTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICBhc2lkZVNlY3Rpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGFzQ29tcG9uZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyQXNpZGVDb21wb25lbnQoaW5kZXgpIHtcclxuICAgIGNvbnN0IGhvdXJzID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaW5kZXhdLmhvdXI7XHJcblxyXG4gICAgaG91cnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBjb25zdCBob3VyID0gZWxlbWVudC50aW1lLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgICAgICBjb25zdCBpY29uID0gZWxlbWVudC5jb25kaXRpb24uaWNvbjtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC5jb25kaXRpb24udGV4dDtcclxuICAgICAgICBjb25zdCB0ZW1wID0gZWxlbWVudC50ZW1wX2M7XHJcbiAgICAgICAgY29uc3QgY2hhbmNlUmFpbiA9IGVsZW1lbnQuY2hhbmNlX29mX3JhaW47XHJcblxyXG4gICAgICAgIGNyZWF0ZUFzQ29tcChob3VyLCBpY29uLCB0ZXh0LCB0ZW1wLCBjaGFuY2VSYWluKVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7cmVuZGVyQXNpZGVDb21wb25lbnR9XHJcbiIsImltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmNvbnN0IGZvb3RlclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3Rlci1zZWN0aW9uXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9vdGVyQ29tcG9uZW50KGRheSwgZGF0ZSwgaWNvbiwgdGVtcCwgY2hhbmNlUmFpbikge1xyXG4gIGNvbnN0IGZvb3RlckNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZm9vdGVyQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJmb28tY29tcFwiKTtcclxuXHJcbiAgZm9vdGVyQ29tcG9uZW50LmlubmVySFRNTCA9IGA8ZGl2PlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2RheX08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsXCI+JHtkYXRlfTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJtYWluLWljb25cIiBzcmM9XCIke2ljb259XCIgLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7dGVtcH3CsEM8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmNoYW5jZSBvZiByYWluPC9wPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gIGZvb3RlclNlY3Rpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGZvb3RlckNvbXBvbmVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGUoZGF0ZSkge1xyXG4gIGNvbnN0IGZ1bGxEYXRlID0gZGF0ZS5zcGxpdChcIi1cIik7XHJcblxyXG4gIGNvbnN0IGRheSA9IGZ1bGxEYXRlWzJdO1xyXG4gIGNvbnN0IG1vbnRoID0gZnVsbERhdGVbMV07XHJcbiAgY29uc3QgeWVhciA9IGZ1bGxEYXRlWzBdO1xyXG5cclxuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5KGRhdGUpIHtcclxuICBjb25zdCB3ZWVrID0gW1wiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCIsIFwiU3VuXCJdO1xyXG4gIGNvbnN0IHdlZWtEYXkgPSBuZXcgRGF0ZShkYXRlKS5nZXREYXkoKTtcclxuICBjb25zdCBkYXkgPSB3ZWVrW3dlZWtEYXldO1xyXG5cclxuICByZXR1cm4gZGF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJGb290ZXJDb21wb25lbnRzKCkge1xyXG4gIGNvbnN0IGRheXMgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcclxuXHJcbiAgZGF5cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCBkYXkgPSBnZXREYXkoZWxlbWVudC5kYXRlKTtcclxuICAgIGNvbnN0IGRhdGUgPSBnZXREYXRlKGVsZW1lbnQuZGF0ZSk7XHJcbiAgICBjb25zdCBpY29uID0gZWxlbWVudC5kYXkuY29uZGl0aW9uLmljb247XHJcbiAgICBjb25zdCB0ZW1wID0gZWxlbWVudC5kYXkuYXZndGVtcF9jO1xyXG4gICAgY29uc3QgY2hhbmNlUmFpbiA9IGVsZW1lbnQuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xyXG5cclxuICAgIGNyZWF0ZUZvb3RlckNvbXBvbmVudChkYXksIGRhdGUsIGljb24sIHRlbXAsIGNoYW5jZVJhaW4pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJGb290ZXJDb21wb25lbnRzLCBnZXREYXRlIH07XHJcbiIsImltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmZ1bmN0aW9uIHNldEhlYWRlckluZm8obmFtZSwgc3VidCwgZGF0ZSkge1xyXG4gIGNvbnN0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3VycmVudC1jaXR5XCIpO1xyXG4gIGNvbnN0IHN1YnRUdGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lvbi1jb3VudHJ5XCIpO1xyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50LWRhdGVcIik7XHJcblxyXG4gIG1haW5UaXRsZS5pbm5lclRleHQgPSBuYW1lO1xyXG4gIHN1YnRUdGwuaW5uZXJUZXh0ID0gc3VidDtcclxuICBjdXJyZW50RGF0ZS5pbm5lclRleHQgPSBkYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzcGxpdERhdGUoZGF0ZSkge1xyXG4gICAgY29uc3QgYXJEYXRlID0gZGF0ZS5zcGxpdChcIiBcIik7XHJcblxyXG4gICAgcmV0dXJuIGFyRGF0ZVswXTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySGVhZGVyKCkge1xyXG4gIGNvbnN0IG5hbWUgPSBkYXRhQmFzZS5sb2NhdGlvbi5uYW1lO1xyXG4gIGNvbnN0IHN1YnQgPSBgJHtkYXRhQmFzZS5sb2NhdGlvbi5yZWdpb259IC0gJHtkYXRhQmFzZS5sb2NhdGlvbi5jb3VudHJ5fWA7XHJcbiAgY29uc3QgZGF0ZSA9IGdldERhdGUoc3BsaXREYXRlKGRhdGFCYXNlLmxvY2F0aW9uLmxvY2FsdGltZSkpO1xyXG5cclxuICBzZXRIZWFkZXJJbmZvKG5hbWUsIHN1YnQsIGRhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJIZWFkZXIgfTtcclxuIiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBnZXREYXRlIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5cclxuY29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1TQ29tcG9uZW50cyhcclxuICB0aXRsZSxcclxuICBkYXRlLFxyXG4gIGljb24sXHJcbiAgdGV4dCxcclxuICB0ZW1wLFxyXG4gIGZlZWxzTGlrZSxcclxuICBtYXhUZW1wLFxyXG4gIG1pblRlbXAsXHJcbiAgY2hhbmNlUmFpbixcclxuICBwcmVjaXBpdGF0aW9uLFxyXG4gIHdpbmRTcGVlZCxcclxuICBodW1pZGl0eSxcclxuICBzdW5yaXNlLFxyXG4gIHN1bnNldFxyXG4pIHtcclxuICBtYWluU2VjdGlvbi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIndyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxoMSBjbGFzcz1cIm1haW4tc3VidFwiPiR7dGl0bGV9PC9oMT5cclxuICAgICAgICAgICAgICA8cD4ke2RhdGV9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7dGV4dH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndyLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj50ZW1wZXJhdHVyZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7dGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5mZWVscyBsaWtlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtmZWVsc0xpa2V9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLXVwLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+bWF4PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHttYXhUZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItZG93bi01MC5wbmdcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+bWluPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHttaW5UZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1yYWluLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2NoYW5jZVJhaW59JTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1oeWdyb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+cHJlY2lwaXRhdGlvbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7cHJlY2lwaXRhdGlvbn08c3BhbiBjbGFzcz1cIl9zbWFsbFwiPm1tPC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC13aW5kLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+d2luZCBzcGVlZDwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7d2luZFNwZWVkfTxzcGFuIGNsYXNzPVwiX3NtYWxsXCI+a20vaDwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtZHJvcC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmh1bWlkaXR5PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtodW1pZGl0eX0lPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXN1bnJpc2UtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5zdW5yaXNlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3N1bnJpc2V9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXN1bnNldC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnN1bnNldDwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHtzdW5zZXR9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheShkYXRlKSB7XHJcbiAgY29uc3Qgd2VlayA9IFtcclxuICAgIFwiTW9uZGF5XCIsXHJcbiAgICBcIlR1ZXNkYXlcIixcclxuICAgIFwiV2VkbmVzZGF5XCIsXHJcbiAgICBcIlRodXJzZGF5XCIsXHJcbiAgICBcIkZyaWRheVwiLFxyXG4gICAgXCJTYXR1cmRheVwiLFxyXG4gICAgXCJTdW5kYXlcIixcclxuICBdO1xyXG4gIGNvbnN0IHdlZWtEYXkgPSBuZXcgRGF0ZShkYXRlKS5nZXREYXkoKTtcclxuICBjb25zdCBkYXkgPSB3ZWVrW3dlZWtEYXldO1xyXG5cclxuICByZXR1cm4gZGF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRIb3VyKGhvdXIpIHtcclxuICBjb25zdCBhckhvdXIgPSBob3VyLnNwbGl0KFwiIFwiKTtcclxuICByZXR1cm4gYCR7YXJIb3VyWzBdfTxzcGFuIGNsYXNzPVwiX3NtYWxsXCI+JHthckhvdXJbMV19PC9zcGFuPmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlck1TQ29tcG9uZW50cygpIHtcclxuICBjb25zdCB0YXJnZXQgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXTtcclxuICBjb25zdCB0aXRsZSA9IGdldERheSh0YXJnZXQuZGF0ZSk7XHJcbiAgY29uc3QgZGF0ZSA9IGdldERhdGUodGFyZ2V0LmRhdGUpO1xyXG4gIGNvbnN0IGljb24gPSB0YXJnZXQuZGF5LmNvbmRpdGlvbi5pY29uO1xyXG4gIGNvbnN0IHRleHQgPSB0YXJnZXQuZGF5LmNvbmRpdGlvbi50ZXh0O1xyXG4gIGNvbnN0IHRlbXAgPSB0YXJnZXQuZGF5LmF2Z3RlbXBfYztcclxuICBjb25zdCBmZWVsc0xpa2UgPSBcIi0vLVwiO1xyXG4gIGNvbnN0IG1heFRlbXAgPSB0YXJnZXQuZGF5Lm1heHRlbXBfYztcclxuICBjb25zdCBtaW5UZW1wID0gdGFyZ2V0LmRheS5taW50ZW1wX2M7XHJcbiAgY29uc3QgY2hhbmNlUmFpbiA9IHRhcmdldC5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XHJcbiAgY29uc3QgcHJlY2lwaXRhdGlvbiA9IHRhcmdldC5kYXkudG90YWxwcmVjaXBfbW07XHJcbiAgY29uc3Qgd2luZFNwZWVkID0gXCItLy1cIjtcclxuICBjb25zdCBodW1pZGl0eSA9IHRhcmdldC5kYXkuYXZnaHVtaWRpdHk7XHJcbiAgY29uc3Qgc3VucmlzZSA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnJpc2UpO1xyXG4gIGNvbnN0IHN1bnNldCA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnNldCk7XHJcblxyXG4gIGNyZWF0ZU1TQ29tcG9uZW50cyhcclxuICAgIHRpdGxlLFxyXG4gICAgZGF0ZSxcclxuICAgIGljb24sXHJcbiAgICB0ZXh0LFxyXG4gICAgdGVtcCxcclxuICAgIGZlZWxzTGlrZSxcclxuICAgIG1heFRlbXAsXHJcbiAgICBtaW5UZW1wLFxyXG4gICAgY2hhbmNlUmFpbixcclxuICAgIHByZWNpcGl0YXRpb24sXHJcbiAgICB3aW5kU3BlZWQsXHJcbiAgICBodW1pZGl0eSxcclxuICAgIHN1bnJpc2UsXHJcbiAgICBzdW5zZXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfTtcclxuIiwibGV0IGRhdGFCYXNlO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YSh2YWx1ZSkge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1jNTVlYmY4OTVkYTg0OTY5OTFmMjIyMDQyMjMxODA5JnE9JHt2YWx1ZX0mZGF5cz0xMCZhcWk9bm8mYWxlcnRzPW5vYFxyXG4gICk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgZGF0YUJhc2UgPSBkYXRhO1xyXG59XHJcblxyXG5leHBvcnQge2RhdGFCYXNlLCBnZXREYXRhfSIsImltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHtyZW5kZXJBc2lkZUNvbXBvbmVudH0gZnJvbSBcIi4vY3JlYXRlQXNDb21wXCI7XHJcbmltcG9ydCB7IHJlbmRlckZvb3RlckNvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZU1haW5TZWN0aW9uXCI7XHJcbmltcG9ydCB7IHJlbmRlckhlYWRlciB9IGZyb20gXCIuL2NyZWF0ZUhlYWRlckNvbXBcIjtcclxuaW1wb3J0IHsgdXBkYXRlQ2xvY2sgfSBmcm9tIFwiLi9jbG9ja1wiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZG9UaGluZ3MoKSB7XHJcbiAgY29uc29sZS5sb2coZGF0YUJhc2UpOyAvL2Rpc3BsYXkgdGhpbmdzIC0+IHdhaXQgZm9yIGRhdGFcclxuICB1cGRhdGVDbG9jaygpO1xyXG4gIHJlbmRlckhlYWRlcigpO1xyXG4gIHJlbmRlck1TQ29tcG9uZW50cygpO1xyXG4gIHJlbmRlckFzaWRlQ29tcG9uZW50KFwiMFwiKTtcclxuICByZW5kZXJGb290ZXJDb21wb25lbnRzKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvVGhpbmdzIH07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IGRvVGhpbmdzIH0gZnJvbSBcIi4vZG9tXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiB0aGluZygpIHtcclxuICAgIGF3YWl0IGdldERhdGEoXCJtYXJhY2FuYXVcIik7XHJcbiAgICBkb1RoaW5ncygpO1xyXG59XHJcblxyXG50aGluZygpO1xyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=