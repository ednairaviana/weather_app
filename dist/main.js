/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/changeScale.js":
/*!****************************!*\
  !*** ./src/changeScale.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeScale: () => (/* binding */ changeScale),
/* harmony export */   farenheit: () => (/* binding */ farenheit)
/* harmony export */ });
/* harmony import */ var _createMainSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createMainSection */ "./src/createMainSection.js");
/* harmony import */ var _createAsComp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createAsComp */ "./src/createAsComp.js");
/* harmony import */ var _createFooComp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createFooComp */ "./src/createFooComp.js");




let farenheit = false;

const tglBtn = document.querySelector(".toggle-btn");
const dot = document.querySelector(".dot");
const c = document.querySelector("#c");
const f = document.querySelector("#f");

function changeScale() {
    tglBtn.addEventListener("click", ()=> {
        if (farenheit) {
            farenheit = false;
            dot.classList.remove("dot-click");
        } else {
            farenheit = true;
            dot.classList.add("dot-click");
        }

        (0,_createMainSection__WEBPACK_IMPORTED_MODULE_0__.renderMSComponents)("0");
        (0,_createAsComp__WEBPACK_IMPORTED_MODULE_1__.renderAsideComponent)("0");
        (0,_createFooComp__WEBPACK_IMPORTED_MODULE_2__.renderFooterComponents)();
    })
}



/***/ }),

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
/* harmony import */ var _changeScale__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changeScale */ "./src/changeScale.js");
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database */ "./src/database.js");



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
                  <p class="_medium">${temp}</p>
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
  const hours = _database__WEBPACK_IMPORTED_MODULE_1__.dataBase.forecast.forecastday[index].hour;

  hours.forEach((element) => {
    const hour = element.time.split(" ")[1];
    const icon = `https://${element.condition.icon}`;
    const text = element.condition.text;
    let temp = `${element.temp_c}°C`;
    const chanceRain = element.chance_of_rain;

    if (_changeScale__WEBPACK_IMPORTED_MODULE_0__.farenheit) {
      temp = `${element.temp_f}°F`;
    }

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
/* harmony import */ var _changeScale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./changeScale */ "./src/changeScale.js");





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
                <p class="_medium-1">${temp}</p>
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
    let temp = `${element.day.avgtemp_c}°C`;
    const chanceRain = element.day.daily_chance_of_rain;

    if (_changeScale__WEBPACK_IMPORTED_MODULE_3__.farenheit) {
      temp = `${element.day.avgtemp_f}°F`;
    }

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
/* harmony import */ var _changeScale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./changeScale */ "./src/changeScale.js");




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

  let temp = `${target.day.avgtemp_c}°C`; ;
  let feelsLike = "-/-";
  let maxTemp = `${target.day.maxtemp_c}°C`;
  let minTemp = `${target.day.mintemp_c}°C`;

  const chanceRain = target.day.daily_chance_of_rain;
  const precipitation = target.day.totalprecip_mm;
  let windSpeed = "-/-";
  const humidity = target.day.avghumidity;

  const sunrise = setHour(target.astro.sunrise);
  const sunset = setHour(target.astro.sunset);

  if (_changeScale__WEBPACK_IMPORTED_MODULE_2__.farenheit) {
    temp = `${target.day.avgtemp_f}°F`;
    maxTemp = `${target.day.maxtemp_f}°F`;
    minTemp = `${target.day.mintemp_f}°F`;
  }

  if (index === "0") {
    windSpeed = _database__WEBPACK_IMPORTED_MODULE_0__.dataBase.current.wind_kph;
    if (_changeScale__WEBPACK_IMPORTED_MODULE_2__.farenheit) {
      temp = `${_database__WEBPACK_IMPORTED_MODULE_0__.dataBase.current.temp_f}°F`;
      feelsLike =`${_database__WEBPACK_IMPORTED_MODULE_0__.dataBase.current.feelslike_f}°F` ;
    } else {
      temp = `${_database__WEBPACK_IMPORTED_MODULE_0__.dataBase.current.temp_c}°C`;
      feelsLike = `${_database__WEBPACK_IMPORTED_MODULE_0__.dataBase.current.feelslike_c}°C`;
    }
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
/* harmony import */ var _changeScale__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./changeScale */ "./src/changeScale.js");








async function doThings(value) {
  await (0,_database__WEBPACK_IMPORTED_MODULE_0__.getData)(value);
  console.log(_database__WEBPACK_IMPORTED_MODULE_0__.dataBase); //display things -> wait for data
  (0,_clock__WEBPACK_IMPORTED_MODULE_5__.getDateApi)();
  (0,_createHeaderComp__WEBPACK_IMPORTED_MODULE_4__.renderHeader)();
  (0,_createMainSection__WEBPACK_IMPORTED_MODULE_3__.renderMSComponents)("0");
  (0,_createAsComp__WEBPACK_IMPORTED_MODULE_1__.renderAsideComponent)("0");
  (0,_createFooComp__WEBPACK_IMPORTED_MODULE_2__.renderFooterComponents)();
  (0,_changeScale__WEBPACK_IMPORTED_MODULE_6__.changeScale)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7QUNuTTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0ZBQXdGLE1BQU07QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVitDO0FBQ087QUFDRztBQUNBO0FBQ1A7QUFDYjtBQUNPO0FBQzVDO0FBQ0E7QUFDQSxRQUFRLGtEQUFPO0FBQ2YsY0FBYywrQ0FBUSxHQUFHO0FBQ3pCLEVBQUUsa0RBQVU7QUFDWixFQUFFLCtEQUFZO0FBQ2QsRUFBRSxzRUFBa0I7QUFDcEIsRUFBRSxtRUFBb0I7QUFDdEIsRUFBRSxzRUFBc0I7QUFDeEIsRUFBRSx5REFBVztBQUNiO0FBQ0E7QUFDb0I7Ozs7Ozs7VUNuQnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTndDO0FBQ1A7QUFDakM7QUFDQSxpREFBUTtBQUNSO0FBQ0EscURBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlEQUFRO0FBQ1osR0FBRztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NoYW5nZVNjYWxlLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY2xvY2suanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVBc0NvbXAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVGb29Db21wLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlSGVhZGVyQ29tcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZU1haW5TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvZGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyTVNDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlTWFpblNlY3Rpb25cIjtcclxuaW1wb3J0IHsgcmVuZGVyQXNpZGVDb21wb25lbnQgfSBmcm9tIFwiLi9jcmVhdGVBc0NvbXBcIjtcclxuaW1wb3J0IHsgcmVuZGVyRm9vdGVyQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZUZvb0NvbXBcIjtcclxuXHJcbmxldCBmYXJlbmhlaXQgPSBmYWxzZTtcclxuXHJcbmNvbnN0IHRnbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9nZ2xlLWJ0blwiKTtcclxuY29uc3QgZG90ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb3RcIik7XHJcbmNvbnN0IGMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NcIik7XHJcbmNvbnN0IGYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ZcIik7XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VTY2FsZSgpIHtcclxuICAgIHRnbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PiB7XHJcbiAgICAgICAgaWYgKGZhcmVuaGVpdCkge1xyXG4gICAgICAgICAgICBmYXJlbmhlaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZG90LmNsYXNzTGlzdC5yZW1vdmUoXCJkb3QtY2xpY2tcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmFyZW5oZWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZG90LmNsYXNzTGlzdC5hZGQoXCJkb3QtY2xpY2tcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZW5kZXJNU0NvbXBvbmVudHMoXCIwXCIpO1xyXG4gICAgICAgIHJlbmRlckFzaWRlQ29tcG9uZW50KFwiMFwiKTtcclxuICAgICAgICByZW5kZXJGb290ZXJDb21wb25lbnRzKCk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQge2ZhcmVuaGVpdCwgY2hhbmdlU2NhbGV9IiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuY29uc3QgY2xvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Nsb2NrXCIpO1xyXG5sZXQgbWlsaXNlY29uZHM7XHJcblxyXG5mdW5jdGlvbiBzZXRDbG9jaygpIHtcclxuICBjb25zdCBjdXJyZW50VGltZSA9IG1pbGlzZWNvbmRzO1xyXG4gIGNvbnN0IGZ1bGxEYXRlID0gbmV3IERhdGUoY3VycmVudFRpbWUpO1xyXG5cclxuICBsZXQgaCA9IGZ1bGxEYXRlLmdldEhvdXJzKCk7XHJcbiAgbGV0IG0gPSBmdWxsRGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgbGV0IHMgPSBmdWxsRGF0ZS5nZXRTZWNvbmRzKCk7XHJcblxyXG4gIGlmKGlzTmFOKG1pbGlzZWNvbmRzKSB8fCBtaWxpc2Vjb25kcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBjbG9jay5pbm5lclRleHQgPSBcIlwiO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKGggPCAxMCkge1xyXG4gICAgaCA9IGAwJHtofWA7XHJcbiAgfVxyXG4gIGlmIChtIDwgMTApIHtcclxuICAgIG0gPSBgMCR7bX1gO1xyXG4gIH1cclxuICBpZiAocyA8IDEwKSB7XHJcbiAgICBzID0gYDAke3N9YDtcclxuICB9XHJcbiAgY2xvY2suaW5uZXJUZXh0ID0gYCR7aH06JHttfToke3N9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0ZUFwaSgpIHtcclxuICBsZXQgZGF0ZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoXCJlbi1VU1wiLCB7XHJcbiAgICB0aW1lWm9uZTogZGF0YUJhc2UubG9jYXRpb24udHpfaWQsXHJcbiAgICBob3VyQ3ljbGU6IFwiaDI0XCIsXHJcbiAgICBtb250aDogXCIyLWRpZ2l0XCIsXHJcbiAgICBkYXk6IFwiMi1kaWdpdFwiLFxyXG4gICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICBob3VyOiBcIjItZGlnaXRcIixcclxuICAgIG1pbnV0ZTogXCIyLWRpZ2l0XCIsXHJcbiAgICBzZWNvbmQ6IFwiMi1kaWdpdFwiLFxyXG4gICAgaG91cjEyOiBcInRydWVcIixcclxuICB9KTtcclxuXHJcbiAgbWlsaXNlY29uZHMgPSBuZXcgRGF0ZShkYXRlKS5nZXRUaW1lKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU1pbGkoKSB7XHJcbiAgc2V0Q2xvY2soKTtcclxuICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBtaWxpc2Vjb25kcyArPSAxMDAwO1xyXG4gICAgdXBkYXRlTWlsaSgpO1xyXG4gICAgc2V0Q2xvY2soKTtcclxuICB9LCAxMDAwKTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBnZXREYXRlQXBpLCB1cGRhdGVNaWxpIH07XHJcbiIsImltcG9ydCB7IGZhcmVuaGVpdCB9IGZyb20gXCIuL2NoYW5nZVNjYWxlXCI7XHJcbmltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmNvbnN0IGFzaWRlU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXNpZGUtc2VjdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUFzQ29tcChob3VyLCBpY29uLCB0ZXh0LCB0ZW1wLCBjaGFuY2VSYWluKSB7XHJcbiAgY29uc3QgYXNDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGFzQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJhcy1jb21wXCIpO1xyXG5cclxuICBhc0NvbXBvbmVudC5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImFzLWNvbXAtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1jbG9jay01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxwPiR7aG91cn08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFzLWNvbXAtY29udFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibWFpbi1pY29uXCIgc3JjPVwiJHtpY29ufVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7dGV4dH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+dGVtcGVyYXR1cmU8L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7dGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1yYWluLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmNoYW5jZSBvZiByYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2NoYW5jZVJhaW59JTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICBhc2lkZVNlY3Rpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGFzQ29tcG9uZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyQXNpZGVDb21wb25lbnQoaW5kZXgpIHtcclxuICBjbGVhckFzaWRlU2VjdGlvbigpO1xyXG4gIGNvbnN0IGhvdXJzID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaW5kZXhdLmhvdXI7XHJcblxyXG4gIGhvdXJzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IGhvdXIgPSBlbGVtZW50LnRpbWUuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgY29uc3QgaWNvbiA9IGBodHRwczovLyR7ZWxlbWVudC5jb25kaXRpb24uaWNvbn1gO1xyXG4gICAgY29uc3QgdGV4dCA9IGVsZW1lbnQuY29uZGl0aW9uLnRleHQ7XHJcbiAgICBsZXQgdGVtcCA9IGAke2VsZW1lbnQudGVtcF9jfcKwQ2A7XHJcbiAgICBjb25zdCBjaGFuY2VSYWluID0gZWxlbWVudC5jaGFuY2Vfb2ZfcmFpbjtcclxuXHJcbiAgICBpZiAoZmFyZW5oZWl0KSB7XHJcbiAgICAgIHRlbXAgPSBgJHtlbGVtZW50LnRlbXBfZn3CsEZgO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUFzQ29tcChob3VyLCBpY29uLCB0ZXh0LCB0ZW1wLCBjaGFuY2VSYWluKTtcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJBc2lkZVNlY3Rpb24oKSB7XHJcbiAgd2hpbGUgKGFzaWRlU2VjdGlvbi5maXJzdENoaWxkKSB7XHJcbiAgICBhc2lkZVNlY3Rpb24ucmVtb3ZlQ2hpbGQoYXNpZGVTZWN0aW9uLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgcmVuZGVyQXNpZGVDb21wb25lbnQgfTtcclxuIiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVNYWluU2VjdGlvblwiO1xyXG5pbXBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9IGZyb20gXCIuL2NyZWF0ZUFzQ29tcFwiO1xyXG5pbXBvcnQgeyBmYXJlbmhlaXQgfSBmcm9tIFwiLi9jaGFuZ2VTY2FsZVwiO1xyXG5cclxuY29uc3QgZm9vdGVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyLXNlY3Rpb25cIik7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb290ZXJDb21wb25lbnQoZGF5LCBkYXRlLCBpY29uLCB0ZW1wLCBjaGFuY2VSYWluLCBpZCkge1xyXG4gIGNvbnN0IGZvb3RlckNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZm9vdGVyQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJmb28tY29tcFwiKTtcclxuICBmb290ZXJDb21wb25lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBgJHtpZH1gKTtcclxuXHJcbiAgZm9vdGVyQ29tcG9uZW50LmlubmVySFRNTCA9IGA8ZGl2PlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2RheX08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsXCI+JHtkYXRlfTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJtYWluLWljb25cIiBzcmM9XCIke2ljb259XCIgLz5cclxuXHJcbiBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj50ZW1wZXJhdHVyZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHt0ZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1yYWluLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICBmb290ZXJTZWN0aW9uLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBmb290ZXJDb21wb25lbnQpO1xyXG5cclxuICBmb290ZXJDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGluZGV4ID0gZm9vdGVyQ29tcG9uZW50LmRhdGFzZXQuaWQ7XHJcbiAgICBzZXRDdXJyZW50Q29tcCgpO1xyXG4gICAgcmVuZGVyTVNDb21wb25lbnRzKGluZGV4KTtcclxuICAgIHJlbmRlckFzaWRlQ29tcG9uZW50KGluZGV4KTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gc2V0Q3VycmVudENvbXAoKSB7XHJcbiAgICBmb290ZXJTZWN0aW9uLmNoaWxkTm9kZXMuZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgY2hpbGQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICBjaGlsZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbiAgICB9KTtcclxuICAgIGZvb3RlckNvbXBvbmVudC5zdHlsZS5vcGFjaXR5ID0gXCIwLjZcIjtcclxuICAgIGZvb3RlckNvbXBvbmVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJGb290ZXJDb21wb25lbnRzKCkge1xyXG4gIGNsZWFyRm9vdGVyU2VjdGlvbigpO1xyXG5cclxuICBjb25zdCBkYXlzID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXk7XHJcbiAgZGF5cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgZGF5ID0gZ2V0RGF5KGVsZW1lbnQuZGF0ZSk7XHJcbiAgICBjb25zdCBkYXRlID0gZ2V0RGF0ZShlbGVtZW50LmRhdGUpO1xyXG4gICAgY29uc3QgaWNvbiA9IGBodHRwczovLyR7ZWxlbWVudC5kYXkuY29uZGl0aW9uLmljb259YDtcclxuICAgIGxldCB0ZW1wID0gYCR7ZWxlbWVudC5kYXkuYXZndGVtcF9jfcKwQ2A7XHJcbiAgICBjb25zdCBjaGFuY2VSYWluID0gZWxlbWVudC5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XHJcblxyXG4gICAgaWYgKGZhcmVuaGVpdCkge1xyXG4gICAgICB0ZW1wID0gYCR7ZWxlbWVudC5kYXkuYXZndGVtcF9mfcKwRmA7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRm9vdGVyQ29tcG9uZW50KGRheSwgZGF0ZSwgaWNvbiwgdGVtcCwgY2hhbmNlUmFpbiwgaW5kZXgpO1xyXG4gIH0pO1xyXG5cclxuICBpbml0Q3VycmVudCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckZvb3RlclNlY3Rpb24oKSB7XHJcbiAgd2hpbGUgKGZvb3RlclNlY3Rpb24uZmlyc3RDaGlsZCkge1xyXG4gICAgZm9vdGVyU2VjdGlvbi5yZW1vdmVDaGlsZChmb290ZXJTZWN0aW9uLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEN1cnJlbnQoKSB7XHJcbiAgY29uc3QgaW5pdCA9IGZvb3RlclNlY3Rpb24uY2hpbGROb2Rlc1swXTtcclxuICBpbml0LnN0eWxlLm9wYWNpdHkgPSBcIjAuNlwiO1xyXG4gIGluaXQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlKGRhdGUpIHtcclxuICBjb25zdCBmdWxsRGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpO1xyXG5cclxuICBjb25zdCBkYXkgPSBmdWxsRGF0ZVsyXTtcclxuICBjb25zdCBtb250aCA9IGZ1bGxEYXRlWzFdO1xyXG4gIGNvbnN0IHllYXIgPSBmdWxsRGF0ZVswXTtcclxuXHJcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheShkYXRlKSB7XHJcbiAgY29uc3Qgd2VlayA9IFtcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiLCBcIlN1blwiXTtcclxuICBjb25zdCB3ZWVrRGF5ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KCk7XHJcbiAgY29uc3QgZGF5ID0gd2Vla1t3ZWVrRGF5XTtcclxuXHJcbiAgcmV0dXJuIGRheTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVuZGVyRm9vdGVyQ29tcG9uZW50cywgZ2V0RGF0ZSB9O1xyXG4iLCJpbXBvcnQgeyBnZXREYXRlIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5pbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcblxyXG5mdW5jdGlvbiBzZXRIZWFkZXJJbmZvKG5hbWUsIHN1YnQsIGRhdGUpIHtcclxuICBjb25zdCBtYWluVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnQtY2l0eVwiKTtcclxuICBjb25zdCBzdWJ0VHRsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpb24tY291bnRyeVwiKTtcclxuICBjb25zdCBjdXJyZW50RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3VycmVudC1kYXRlXCIpO1xyXG5cclxuICBtYWluVGl0bGUuaW5uZXJUZXh0ID0gbmFtZTtcclxuICBzdWJ0VHRsLmlubmVyVGV4dCA9IHN1YnQ7XHJcbiAgY3VycmVudERhdGUuaW5uZXJUZXh0ID0gZGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3BsaXREYXRlKGRhdGUpIHtcclxuICAgIGNvbnN0IGFyRGF0ZSA9IGRhdGUuc3BsaXQoXCIgXCIpO1xyXG5cclxuICAgIHJldHVybiBhckRhdGVbMF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckhlYWRlcigpIHtcclxuICBjb25zdCBuYW1lID0gZGF0YUJhc2UubG9jYXRpb24ubmFtZTtcclxuICBjb25zdCBzdWJ0ID0gYCR7ZGF0YUJhc2UubG9jYXRpb24ucmVnaW9ufSAtICR7ZGF0YUJhc2UubG9jYXRpb24uY291bnRyeX1gO1xyXG4gIGNvbnN0IGRhdGUgPSBnZXREYXRlKHNwbGl0RGF0ZShkYXRhQmFzZS5sb2NhdGlvbi5sb2NhbHRpbWUpKTtcclxuXHJcbiAgc2V0SGVhZGVySW5mbyhuYW1lLCBzdWJ0LCBkYXRlKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVuZGVySGVhZGVyIH07XHJcbiIsImltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCIuL2NyZWF0ZUZvb0NvbXBcIjtcclxuaW1wb3J0IHsgZmFyZW5oZWl0IH0gZnJvbSBcIi4vY2hhbmdlU2NhbGVcIjtcclxuXHJcbmNvbnN0IG1haW5TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXNlY3Rpb25cIik7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNU0NvbXBvbmVudHMoXHJcbiAgdGl0bGUsXHJcbiAgZGF0ZSxcclxuICBpY29uLFxyXG4gIHRleHQsXHJcbiAgdGVtcCxcclxuICBmZWVsc0xpa2UsXHJcbiAgbWF4VGVtcCxcclxuICBtaW5UZW1wLFxyXG4gIGNoYW5jZVJhaW4sXHJcbiAgcHJlY2lwaXRhdGlvbixcclxuICB3aW5kU3BlZWQsXHJcbiAgaHVtaWRpdHksXHJcbiAgc3VucmlzZSxcclxuICBzdW5zZXRcclxuKSB7XHJcbiAgbWFpblNlY3Rpb24uaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJ3ci1oZWFkZXJcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJtYWluLXN1YnRcIj4ke3RpdGxlfTwvaDE+XHJcbiAgICAgICAgICAgICAgPHA+JHtkYXRlfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtYWluLWljb25cIiBzcmM9XCIke2ljb259XCIgLz5cclxuICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7dGV4dH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIndyLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj50ZW1wZXJhdHVyZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7dGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5mZWVscyBsaWtlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtmZWVsc0xpa2V9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLXVwLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+bWF4PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHttYXhUZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItZG93bi01MC5wbmdcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+bWluPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHttaW5UZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1yYWluLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2NoYW5jZVJhaW59JTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1oeWdyb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+cHJlY2lwaXRhdGlvbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7cHJlY2lwaXRhdGlvbn08c3BhbiBjbGFzcz1cIl9zbWFsbFwiPm1tPC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC13aW5kLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+d2luZCBzcGVlZDwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7d2luZFNwZWVkfTxzcGFuIGNsYXNzPVwiX3NtYWxsXCI+a20vaDwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtZHJvcC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmh1bWlkaXR5PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtodW1pZGl0eX0lPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXN1bnJpc2UtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5zdW5yaXNlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3N1bnJpc2V9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXN1bnNldC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnN1bnNldDwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHtzdW5zZXR9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheShkYXRlKSB7XHJcbiAgY29uc3Qgd2VlayA9IFtcclxuICAgIFwiTW9uZGF5XCIsXHJcbiAgICBcIlR1ZXNkYXlcIixcclxuICAgIFwiV2VkbmVzZGF5XCIsXHJcbiAgICBcIlRodXJzZGF5XCIsXHJcbiAgICBcIkZyaWRheVwiLFxyXG4gICAgXCJTYXR1cmRheVwiLFxyXG4gICAgXCJTdW5kYXlcIixcclxuICBdO1xyXG4gIGNvbnN0IHdlZWtEYXkgPSBuZXcgRGF0ZShkYXRlKS5nZXREYXkoKTtcclxuICBjb25zdCBkYXkgPSB3ZWVrW3dlZWtEYXldO1xyXG5cclxuICByZXR1cm4gZGF5O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRIb3VyKGhvdXIpIHtcclxuICBjb25zdCBhckhvdXIgPSBob3VyLnNwbGl0KFwiIFwiKTtcclxuICByZXR1cm4gYCR7YXJIb3VyWzBdfTxzcGFuIGNsYXNzPVwiX3NtYWxsXCI+JHthckhvdXJbMV19PC9zcGFuPmA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlck1TQ29tcG9uZW50cyhpbmRleCkge1xyXG4gIGNvbnN0IHRhcmdldCA9IGRhdGFCYXNlLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2luZGV4XTtcclxuICBjb25zdCB0aXRsZSA9IGdldERheSh0YXJnZXQuZGF0ZSk7XHJcbiAgY29uc3QgZGF0ZSA9IGdldERhdGUodGFyZ2V0LmRhdGUpO1xyXG4gIGNvbnN0IGljb24gPSBgaHR0cHM6Ly8ke3RhcmdldC5kYXkuY29uZGl0aW9uLmljb259YDtcclxuICBjb25zdCB0ZXh0ID0gdGFyZ2V0LmRheS5jb25kaXRpb24udGV4dDtcclxuXHJcbiAgbGV0IHRlbXAgPSBgJHt0YXJnZXQuZGF5LmF2Z3RlbXBfY33CsENgOyA7XHJcbiAgbGV0IGZlZWxzTGlrZSA9IFwiLS8tXCI7XHJcbiAgbGV0IG1heFRlbXAgPSBgJHt0YXJnZXQuZGF5Lm1heHRlbXBfY33CsENgO1xyXG4gIGxldCBtaW5UZW1wID0gYCR7dGFyZ2V0LmRheS5taW50ZW1wX2N9wrBDYDtcclxuXHJcbiAgY29uc3QgY2hhbmNlUmFpbiA9IHRhcmdldC5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XHJcbiAgY29uc3QgcHJlY2lwaXRhdGlvbiA9IHRhcmdldC5kYXkudG90YWxwcmVjaXBfbW07XHJcbiAgbGV0IHdpbmRTcGVlZCA9IFwiLS8tXCI7XHJcbiAgY29uc3QgaHVtaWRpdHkgPSB0YXJnZXQuZGF5LmF2Z2h1bWlkaXR5O1xyXG5cclxuICBjb25zdCBzdW5yaXNlID0gc2V0SG91cih0YXJnZXQuYXN0cm8uc3VucmlzZSk7XHJcbiAgY29uc3Qgc3Vuc2V0ID0gc2V0SG91cih0YXJnZXQuYXN0cm8uc3Vuc2V0KTtcclxuXHJcbiAgaWYgKGZhcmVuaGVpdCkge1xyXG4gICAgdGVtcCA9IGAke3RhcmdldC5kYXkuYXZndGVtcF9mfcKwRmA7XHJcbiAgICBtYXhUZW1wID0gYCR7dGFyZ2V0LmRheS5tYXh0ZW1wX2Z9wrBGYDtcclxuICAgIG1pblRlbXAgPSBgJHt0YXJnZXQuZGF5Lm1pbnRlbXBfZn3CsEZgO1xyXG4gIH1cclxuXHJcbiAgaWYgKGluZGV4ID09PSBcIjBcIikge1xyXG4gICAgd2luZFNwZWVkID0gZGF0YUJhc2UuY3VycmVudC53aW5kX2twaDtcclxuICAgIGlmIChmYXJlbmhlaXQpIHtcclxuICAgICAgdGVtcCA9IGAke2RhdGFCYXNlLmN1cnJlbnQudGVtcF9mfcKwRmA7XHJcbiAgICAgIGZlZWxzTGlrZSA9YCR7ZGF0YUJhc2UuY3VycmVudC5mZWVsc2xpa2VfZn3CsEZgIDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRlbXAgPSBgJHtkYXRhQmFzZS5jdXJyZW50LnRlbXBfY33CsENgO1xyXG4gICAgICBmZWVsc0xpa2UgPSBgJHtkYXRhQmFzZS5jdXJyZW50LmZlZWxzbGlrZV9jfcKwQ2A7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVNU0NvbXBvbmVudHMoXHJcbiAgICB0aXRsZSxcclxuICAgIGRhdGUsXHJcbiAgICBpY29uLFxyXG4gICAgdGV4dCxcclxuICAgIHRlbXAsXHJcbiAgICBmZWVsc0xpa2UsXHJcbiAgICBtYXhUZW1wLFxyXG4gICAgbWluVGVtcCxcclxuICAgIGNoYW5jZVJhaW4sXHJcbiAgICBwcmVjaXBpdGF0aW9uLFxyXG4gICAgd2luZFNwZWVkLFxyXG4gICAgaHVtaWRpdHksXHJcbiAgICBzdW5yaXNlLFxyXG4gICAgc3Vuc2V0XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVuZGVyTVNDb21wb25lbnRzIH07XHJcbiIsImxldCBkYXRhQmFzZTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldERhdGEodmFsdWUpIHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgYGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YzU1ZWJmODk1ZGE4NDk2OTkxZjIyMjA0MjIzMTgwOSZxPSR7dmFsdWV9JmRheXM9MTAmYXFpPW5vJmFsZXJ0cz1ub2BcclxuICApO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gIGRhdGFCYXNlID0gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IHtkYXRhQmFzZSwgZ2V0RGF0YX0iLCJpbXBvcnQgeyBkYXRhQmFzZSwgZ2V0RGF0YSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IHJlbmRlckFzaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4vY3JlYXRlQXNDb21wXCI7XHJcbmltcG9ydCB7IHJlbmRlckZvb3RlckNvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZU1haW5TZWN0aW9uXCI7XHJcbmltcG9ydCB7IHJlbmRlckhlYWRlciB9IGZyb20gXCIuL2NyZWF0ZUhlYWRlckNvbXBcIjtcclxuaW1wb3J0IHsgZ2V0RGF0ZUFwaSB9IGZyb20gXCIuL2Nsb2NrXCI7XHJcbmltcG9ydCB7IGNoYW5nZVNjYWxlIH0gZnJvbSBcIi4vY2hhbmdlU2NhbGVcIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRvVGhpbmdzKHZhbHVlKSB7XHJcbiAgYXdhaXQgZ2V0RGF0YSh2YWx1ZSk7XHJcbiAgY29uc29sZS5sb2coZGF0YUJhc2UpOyAvL2Rpc3BsYXkgdGhpbmdzIC0+IHdhaXQgZm9yIGRhdGFcclxuICBnZXREYXRlQXBpKCk7XHJcbiAgcmVuZGVySGVhZGVyKCk7XHJcbiAgcmVuZGVyTVNDb21wb25lbnRzKFwiMFwiKTtcclxuICByZW5kZXJBc2lkZUNvbXBvbmVudChcIjBcIik7XHJcbiAgcmVuZGVyRm9vdGVyQ29tcG9uZW50cygpO1xyXG4gIGNoYW5nZVNjYWxlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvVGhpbmdzIH07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgdXBkYXRlTWlsaSB9IGZyb20gXCIuL2Nsb2NrLmpzXCI7XHJcbmltcG9ydCB7ZG9UaGluZ3N9IGZyb20gXCIuL2RvbS5qc1wiXHJcblxyXG5kb1RoaW5ncyhcImxvbmRvblwiKTtcclxuc2VhcmNoT25DbGljaygpO1xyXG51cGRhdGVNaWxpKCk7XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hPbkNsaWNrKCkge1xyXG4gIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIik7XHJcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5cIik7XHJcblxyXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9UaGluZ3Moc2VhcmNoSW5wdXQudmFsdWUpO1xyXG4gIH0pO1xyXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9