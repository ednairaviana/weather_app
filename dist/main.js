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
    const icon = element.condition.icon;
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
    console.log(footerSection.childNodes);
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
    const icon = element.day.condition.icon;
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
  const icon = target.day.condition.icon;
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

  if(index === "0") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aURBQVE7QUFDWixHQUFHO0FBQ0gsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY2xvY2suanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVBc0NvbXAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVGb29Db21wLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlSGVhZGVyQ29tcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZU1haW5TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvZGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuY29uc3QgY2xvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb2NrXCIpO1xyXG5sZXQgbWlsaXNlY29uZHM7XHJcblxyXG5mdW5jdGlvbiBzZXRDbG9jaygpIHtcclxuICBjb25zdCBjdXJyZW50VGltZSA9IG1pbGlzZWNvbmRzO1xyXG4gIGNvbnN0IGZ1bGxEYXRlID0gbmV3IERhdGUoY3VycmVudFRpbWUpO1xyXG5cclxuICBsZXQgaCA9IGZ1bGxEYXRlLmdldEhvdXJzKCk7XHJcbiAgbGV0IG0gPSBmdWxsRGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgbGV0IHMgPSBmdWxsRGF0ZS5nZXRTZWNvbmRzKCk7XHJcblxyXG4gIGlmKGlzTmFOKG1pbGlzZWNvbmRzKSB8fCBtaWxpc2Vjb25kcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBjbG9jay5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKGggPCAxMCkge1xyXG4gICAgaCA9IGAwJHtofWA7XHJcbiAgfVxyXG4gIGlmIChtIDwgMTApIHtcclxuICAgIG0gPSBgMCR7bX1gO1xyXG4gIH1cclxuICBpZiAocyA8IDEwKSB7XHJcbiAgICBzID0gYDAke3N9YDtcclxuICB9XHJcbiAgY2xvY2suaW5uZXJUZXh0ID0gYCR7aH06JHttfToke3N9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0ZUFwaSgpIHtcclxuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7XHJcbiAgICB0aW1lWm9uZTogZGF0YUJhc2UubG9jYXRpb24udHpfaWQsXHJcbiAgICBob3VyQ3ljbGU6IFwiaDI0XCIsXHJcbiAgICBtb250aDogXCIyLWRpZ2l0XCIsXHJcbiAgICBkYXk6IFwiMi1kaWdpdFwiLFxyXG4gICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICBob3VyOiBcIjItZGlnaXRcIixcclxuICAgIG1pbnV0ZTogXCIyLWRpZ2l0XCIsXHJcbiAgICBzZWNvbmQ6IFwiMi1kaWdpdFwiLFxyXG4gICAgaG91cjEyOiBcInRydWVcIixcclxuICB9KTtcclxuXHJcbiAgbWlsaXNlY29uZHMgPSBuZXcgRGF0ZShkYXRlKS5nZXRUaW1lKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU1pbGkoKSB7XHJcbiAgc2V0Q2xvY2soKTtcclxuICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBtaWxpc2Vjb25kcyArPSAxMDAwO1xyXG4gICAgdXBkYXRlTWlsaSgpO1xyXG4gICAgc2V0Q2xvY2soKTtcclxuICB9LCAxMDAwKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBnZXREYXRlQXBpLCB1cGRhdGVNaWxpIH07XHJcbiIsImltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmNvbnN0IGFzaWRlU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXNpZGUtc2VjdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUFzQ29tcChob3VyLCBpY29uLCB0ZXh0LCB0ZW1wLCBjaGFuY2VSYWluKSB7XHJcbiAgY29uc3QgYXNDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGFzQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJhcy1jb21wXCIpO1xyXG5cclxuICBhc0NvbXBvbmVudC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImFzLWNvbXAtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1jbG9jay01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxwPiR7aG91cn08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzLWNvbXAtY29udFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibWFpbi1pY29uXCIgc3JjPVwiJHtpY29ufVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7dGV4dH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+dGVtcGVyYXR1cmU8L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7dGVtcH3CsEM8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1yYWluLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmNoYW5jZSBvZiByYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2NoYW5jZVJhaW59JTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICBhc2lkZVNlY3Rpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGFzQ29tcG9uZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyQXNpZGVDb21wb25lbnQoaW5kZXgpIHtcclxuICBjbGVhckFzaWRlU2VjdGlvbigpO1xyXG4gIGNvbnN0IGhvdXJzID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaW5kZXhdLmhvdXI7XHJcblxyXG4gIGhvdXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IGhvdXIgPSBlbGVtZW50LnRpbWUuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgY29uc3QgaWNvbiA9IGVsZW1lbnQuY29uZGl0aW9uLmljb247XHJcbiAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC5jb25kaXRpb24udGV4dDtcclxuICAgIGNvbnN0IHRlbXAgPSBlbGVtZW50LnRlbXBfYztcclxuICAgIGNvbnN0IGNoYW5jZVJhaW4gPSBlbGVtZW50LmNoYW5jZV9vZl9yYWluO1xyXG5cclxuICAgIGNyZWF0ZUFzQ29tcChob3VyLCBpY29uLCB0ZXh0LCB0ZW1wLCBjaGFuY2VSYWluKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJBc2lkZVNlY3Rpb24oKSB7XHJcbiAgd2hpbGUgKGFzaWRlU2VjdGlvbi5maXJzdENoaWxkKSB7XHJcbiAgICBhc2lkZVNlY3Rpb24ucmVtb3ZlQ2hpbGQoYXNpZGVTZWN0aW9uLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgcmVuZGVyQXNpZGVDb21wb25lbnQgfTtcclxuIiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVNYWluU2VjdGlvblwiO1xyXG5pbXBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9IGZyb20gXCIuL2NyZWF0ZUFzQ29tcFwiO1xyXG5cclxuY29uc3QgZm9vdGVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyLXNlY3Rpb25cIik7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb290ZXJDb21wb25lbnQoZGF5LCBkYXRlLCBpY29uLCB0ZW1wLCBjaGFuY2VSYWluLCBpZCkge1xyXG4gIGNvbnN0IGZvb3RlckNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZm9vdGVyQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJmb28tY29tcFwiKTtcclxuICBmb290ZXJDb21wb25lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBgJHtpZH1gKTtcclxuXHJcbiAgZm9vdGVyQ29tcG9uZW50LmlubmVySFRNTCA9IGA8ZGl2PlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2RheX08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsXCI+JHtkYXRlfTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJtYWluLWljb25cIiBzcmM9XCIke2ljb259XCIgLz5cclxuXHJcbiBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj50ZW1wZXJhdHVyZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHt0ZW1wfcKwQzwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1yYWluLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICBmb290ZXJTZWN0aW9uLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBmb290ZXJDb21wb25lbnQpO1xyXG5cclxuICBmb290ZXJDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGluZGV4ID0gZm9vdGVyQ29tcG9uZW50LmRhdGFzZXQuaWQ7XHJcbiAgICBzZXRDdXJyZW50Q29tcCgpO1xyXG4gICAgcmVuZGVyTVNDb21wb25lbnRzKGluZGV4KTtcclxuICAgIHJlbmRlckFzaWRlQ29tcG9uZW50KGluZGV4KTtcclxuICAgIGNvbnNvbGUubG9nKGZvb3RlclNlY3Rpb24uY2hpbGROb2Rlcyk7XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHNldEN1cnJlbnRDb21wKCkge1xyXG4gICAgZm9vdGVyU2VjdGlvbi5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgIGNoaWxkLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgY2hpbGQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG4gICAgfSk7XHJcbiAgICBmb290ZXJDb21wb25lbnQuc3R5bGUub3BhY2l0eSA9IFwiMC42XCI7XHJcbiAgICBmb290ZXJDb21wb25lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyRm9vdGVyQ29tcG9uZW50cygpIHtcclxuICBjbGVhckZvb3RlclNlY3Rpb24oKTtcclxuXHJcbiAgY29uc3QgZGF5cyA9IGRhdGFCYXNlLmZvcmVjYXN0LmZvcmVjYXN0ZGF5O1xyXG4gIGRheXMuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgIGNvbnN0IGRheSA9IGdldERheShlbGVtZW50LmRhdGUpO1xyXG4gICAgY29uc3QgZGF0ZSA9IGdldERhdGUoZWxlbWVudC5kYXRlKTtcclxuICAgIGNvbnN0IGljb24gPSBlbGVtZW50LmRheS5jb25kaXRpb24uaWNvbjtcclxuICAgIGNvbnN0IHRlbXAgPSBlbGVtZW50LmRheS5hdmd0ZW1wX2M7XHJcbiAgICBjb25zdCBjaGFuY2VSYWluID0gZWxlbWVudC5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XHJcblxyXG4gICAgY3JlYXRlRm9vdGVyQ29tcG9uZW50KGRheSwgZGF0ZSwgaWNvbiwgdGVtcCwgY2hhbmNlUmFpbiwgaW5kZXgpO1xyXG4gIH0pO1xyXG4gIFxyXG4gIGluaXRDdXJyZW50KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRm9vdGVyU2VjdGlvbigpIHtcclxuICB3aGlsZSAoZm9vdGVyU2VjdGlvbi5maXJzdENoaWxkKSB7XHJcbiAgICBmb290ZXJTZWN0aW9uLnJlbW92ZUNoaWxkKGZvb3RlclNlY3Rpb24uZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q3VycmVudCgpIHtcclxuICBjb25zdCBpbml0ID0gZm9vdGVyU2VjdGlvbi5jaGlsZE5vZGVzWzBdO1xyXG4gIGluaXQuc3R5bGUub3BhY2l0eSA9IFwiMC42XCI7XHJcbiAgaW5pdC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGUoZGF0ZSkge1xyXG4gIGNvbnN0IGZ1bGxEYXRlID0gZGF0ZS5zcGxpdChcIi1cIik7XHJcblxyXG4gIGNvbnN0IGRheSA9IGZ1bGxEYXRlWzJdO1xyXG4gIGNvbnN0IG1vbnRoID0gZnVsbERhdGVbMV07XHJcbiAgY29uc3QgeWVhciA9IGZ1bGxEYXRlWzBdO1xyXG5cclxuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5KGRhdGUpIHtcclxuICBjb25zdCB3ZWVrID0gW1wiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCIsIFwiU3VuXCJdO1xyXG4gIGNvbnN0IHdlZWtEYXkgPSBuZXcgRGF0ZShkYXRlKS5nZXREYXkoKTtcclxuICBjb25zdCBkYXkgPSB3ZWVrW3dlZWtEYXldO1xyXG5cclxuICByZXR1cm4gZGF5O1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJGb290ZXJDb21wb25lbnRzLCBnZXREYXRlIH07XHJcbiIsImltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmZ1bmN0aW9uIHNldEhlYWRlckluZm8obmFtZSwgc3VidCwgZGF0ZSkge1xyXG4gIGNvbnN0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3VycmVudC1jaXR5XCIpO1xyXG4gIGNvbnN0IHN1YnRUdGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lvbi1jb3VudHJ5XCIpO1xyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50LWRhdGVcIik7XHJcblxyXG4gIG1haW5UaXRsZS5pbm5lclRleHQgPSBuYW1lO1xyXG4gIHN1YnRUdGwuaW5uZXJUZXh0ID0gc3VidDtcclxuICBjdXJyZW50RGF0ZS5pbm5lclRleHQgPSBkYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzcGxpdERhdGUoZGF0ZSkge1xyXG4gICAgY29uc3QgYXJEYXRlID0gZGF0ZS5zcGxpdChcIiBcIik7XHJcblxyXG4gICAgcmV0dXJuIGFyRGF0ZVswXTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySGVhZGVyKCkge1xyXG4gIGNvbnN0IG5hbWUgPSBkYXRhQmFzZS5sb2NhdGlvbi5uYW1lO1xyXG4gIGNvbnN0IHN1YnQgPSBgJHtkYXRhQmFzZS5sb2NhdGlvbi5yZWdpb259IC0gJHtkYXRhQmFzZS5sb2NhdGlvbi5jb3VudHJ5fWA7XHJcbiAgY29uc3QgZGF0ZSA9IGdldERhdGUoc3BsaXREYXRlKGRhdGFCYXNlLmxvY2F0aW9uLmxvY2FsdGltZSkpO1xyXG5cclxuICBzZXRIZWFkZXJJbmZvKG5hbWUsIHN1YnQsIGRhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJIZWFkZXIgfTtcclxuIiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBnZXREYXRlIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5cclxuY29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1TQ29tcG9uZW50cyhcclxuICB0aXRsZSxcclxuICBkYXRlLFxyXG4gIGljb24sXHJcbiAgdGV4dCxcclxuICB0ZW1wLFxyXG4gIGZlZWxzTGlrZSxcclxuICBtYXhUZW1wLFxyXG4gIG1pblRlbXAsXHJcbiAgY2hhbmNlUmFpbixcclxuICBwcmVjaXBpdGF0aW9uLFxyXG4gIHdpbmRTcGVlZCxcclxuICBodW1pZGl0eSxcclxuICBzdW5yaXNlLFxyXG4gIHN1bnNldFxyXG4pIHtcclxuICBtYWluU2VjdGlvbi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIndyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxoMSBjbGFzcz1cIm1haW4tc3VidFwiPiR7dGl0bGV9PC9oMT5cclxuICAgICAgICAgICAgICA8cD4ke2RhdGV9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHt0ZXh0fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3ItY29udGVudFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmZlZWxzIGxpa2U8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2ZlZWxzTGlrZX08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItdXAtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5tYXg8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke21heFRlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci1kb3duLTUwLnBuZ1wiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5taW48L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke21pblRlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5jaGFuY2Ugb2YgcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWh5Z3JvbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5wcmVjaXBpdGF0aW9uPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtwcmVjaXBpdGF0aW9ufTxzcGFuIGNsYXNzPVwiX3NtYWxsXCI+bW08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXdpbmQtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj53aW5kIHNwZWVkPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt3aW5kU3BlZWR9PHNwYW4gY2xhc3M9XCJfc21hbGxcIj5rbS9oPC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1kcm9wLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+aHVtaWRpdHk8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2h1bWlkaXR5fSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtc3VucmlzZS01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnN1bnJpc2U8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7c3VucmlzZX08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtc3Vuc2V0LTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+c3Vuc2V0PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3N1bnNldH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5KGRhdGUpIHtcclxuICBjb25zdCB3ZWVrID0gW1xyXG4gICAgXCJNb25kYXlcIixcclxuICAgIFwiVHVlc2RheVwiLFxyXG4gICAgXCJXZWRuZXNkYXlcIixcclxuICAgIFwiVGh1cnNkYXlcIixcclxuICAgIFwiRnJpZGF5XCIsXHJcbiAgICBcIlNhdHVyZGF5XCIsXHJcbiAgICBcIlN1bmRheVwiLFxyXG4gIF07XHJcbiAgY29uc3Qgd2Vla0RheSA9IG5ldyBEYXRlKGRhdGUpLmdldERheSgpO1xyXG4gIGNvbnN0IGRheSA9IHdlZWtbd2Vla0RheV07XHJcblxyXG4gIHJldHVybiBkYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEhvdXIoaG91cikge1xyXG4gIGNvbnN0IGFySG91ciA9IGhvdXIuc3BsaXQoXCIgXCIpO1xyXG4gIHJldHVybiBgJHthckhvdXJbMF19PHNwYW4gY2xhc3M9XCJfc21hbGxcIj4ke2FySG91clsxXX08L3NwYW4+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyTVNDb21wb25lbnRzKGluZGV4KSB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaW5kZXhdO1xyXG4gIGNvbnN0IHRpdGxlID0gZ2V0RGF5KHRhcmdldC5kYXRlKTtcclxuICBjb25zdCBkYXRlID0gZ2V0RGF0ZSh0YXJnZXQuZGF0ZSk7XHJcbiAgY29uc3QgaWNvbiA9IHRhcmdldC5kYXkuY29uZGl0aW9uLmljb247XHJcbiAgY29uc3QgdGV4dCA9IHRhcmdldC5kYXkuY29uZGl0aW9uLnRleHQ7XHJcbiAgbGV0IHRlbXAgPSB0YXJnZXQuZGF5LmF2Z3RlbXBfYztcclxuICBsZXQgZmVlbHNMaWtlID0gXCItLy1cIjtcclxuICBjb25zdCBtYXhUZW1wID0gdGFyZ2V0LmRheS5tYXh0ZW1wX2M7XHJcbiAgY29uc3QgbWluVGVtcCA9IHRhcmdldC5kYXkubWludGVtcF9jO1xyXG4gIGNvbnN0IGNoYW5jZVJhaW4gPSB0YXJnZXQuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb24gPSB0YXJnZXQuZGF5LnRvdGFscHJlY2lwX21tO1xyXG4gIGxldCB3aW5kU3BlZWQgPSBcIi0vLVwiO1xyXG4gIGNvbnN0IGh1bWlkaXR5ID0gdGFyZ2V0LmRheS5hdmdodW1pZGl0eTtcclxuICBjb25zdCBzdW5yaXNlID0gc2V0SG91cih0YXJnZXQuYXN0cm8uc3VucmlzZSk7XHJcbiAgY29uc3Qgc3Vuc2V0ID0gc2V0SG91cih0YXJnZXQuYXN0cm8uc3Vuc2V0KTtcclxuXHJcbiAgaWYoaW5kZXggPT09IFwiMFwiKSB7XHJcbiAgICB0ZW1wID0gZGF0YUJhc2UuY3VycmVudC50ZW1wX2M7XHJcbiAgICBmZWVsc0xpa2UgPSBkYXRhQmFzZS5jdXJyZW50LmZlZWxzbGlrZV9jO1xyXG4gICAgd2luZFNwZWVkID0gZGF0YUJhc2UuY3VycmVudC53aW5kX2twaDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1TQ29tcG9uZW50cyhcclxuICAgIHRpdGxlLFxyXG4gICAgZGF0ZSxcclxuICAgIGljb24sXHJcbiAgICB0ZXh0LFxyXG4gICAgdGVtcCxcclxuICAgIGZlZWxzTGlrZSxcclxuICAgIG1heFRlbXAsXHJcbiAgICBtaW5UZW1wLFxyXG4gICAgY2hhbmNlUmFpbixcclxuICAgIHByZWNpcGl0YXRpb24sXHJcbiAgICB3aW5kU3BlZWQsXHJcbiAgICBodW1pZGl0eSxcclxuICAgIHN1bnJpc2UsXHJcbiAgICBzdW5zZXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfTtcclxuIiwibGV0IGRhdGFCYXNlO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YSh2YWx1ZSkge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1jNTVlYmY4OTVkYTg0OTY5OTFmMjIyMDQyMjMxODA5JnE9JHt2YWx1ZX0mZGF5cz0xMCZhcWk9bm8mYWxlcnRzPW5vYFxyXG4gICk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgZGF0YUJhc2UgPSBkYXRhO1xyXG59XHJcblxyXG5leHBvcnQge2RhdGFCYXNlLCBnZXREYXRhfSIsImltcG9ydCB7IGRhdGFCYXNlLCBnZXREYXRhIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgcmVuZGVyQXNpZGVDb21wb25lbnQgfSBmcm9tIFwiLi9jcmVhdGVBc0NvbXBcIjtcclxuaW1wb3J0IHsgcmVuZGVyRm9vdGVyQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZUZvb0NvbXBcIjtcclxuaW1wb3J0IHsgcmVuZGVyTVNDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlTWFpblNlY3Rpb25cIjtcclxuaW1wb3J0IHsgcmVuZGVySGVhZGVyIH0gZnJvbSBcIi4vY3JlYXRlSGVhZGVyQ29tcFwiO1xyXG5pbXBvcnQgeyBnZXREYXRlQXBpIH0gZnJvbSBcIi4vY2xvY2tcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRvVGhpbmdzKHZhbHVlKSB7XHJcbiAgYXdhaXQgZ2V0RGF0YSh2YWx1ZSk7XHJcbiAgY29uc29sZS5sb2coZGF0YUJhc2UpOyAvL2Rpc3BsYXkgdGhpbmdzIC0+IHdhaXQgZm9yIGRhdGFcclxuICBnZXREYXRlQXBpKCk7XHJcbiAgcmVuZGVySGVhZGVyKCk7XHJcbiAgcmVuZGVyTVNDb21wb25lbnRzKFwiMFwiKTtcclxuICByZW5kZXJBc2lkZUNvbXBvbmVudChcIjBcIik7XHJcbiAgcmVuZGVyRm9vdGVyQ29tcG9uZW50cygpO1xyXG59XHJcblxyXG5leHBvcnQgeyBkb1RoaW5ncyB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHVwZGF0ZU1pbGkgfSBmcm9tIFwiLi9jbG9jay5qc1wiO1xyXG5pbXBvcnQge2RvVGhpbmdzfSBmcm9tIFwiLi9kb20uanNcIlxyXG5cclxuZG9UaGluZ3MoXCJsb25kb25cIik7XHJcbnNlYXJjaE9uQ2xpY2soKTtcclxudXBkYXRlTWlsaSgpO1xyXG5cclxuZnVuY3Rpb24gc2VhcmNoT25DbGljaygpIHtcclxuICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpO1xyXG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuXCIpO1xyXG5cclxuICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGRvVGhpbmdzKHNlYXJjaElucHV0LnZhbHVlKTtcclxuICB9KTtcclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==