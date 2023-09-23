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
/* harmony export */   doThings: () => (/* binding */ doThings),
/* harmony export */   searchOnClick: () => (/* binding */ searchOnClick)
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

function searchOnClick() {
  const searchInput = document.querySelector("#search");
  const btn = document.querySelector("#btn");

  btn.addEventListener("click", () => {
    doThings(searchInput.value);
    (0,_changeScale__WEBPACK_IMPORTED_MODULE_6__.changeScale)();
  });
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
(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.searchOnClick)();
(0,_clock_js__WEBPACK_IMPORTED_MODULE_0__.updateMili)();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7QUNuTTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0ZBQXdGLE1BQU07QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1YrQztBQUNPO0FBQ0c7QUFDQTtBQUNQO0FBQ2I7QUFDTztBQUM1QztBQUNBO0FBQ0EsUUFBUSxrREFBTztBQUNmLGNBQWMsK0NBQVEsR0FBRztBQUN6QixFQUFFLGtEQUFVO0FBQ1osRUFBRSwrREFBWTtBQUNkLEVBQUUsc0VBQWtCO0FBQ3BCLEVBQUUsbUVBQW9CO0FBQ3RCLEVBQUUsc0VBQXNCO0FBQ3hCLEVBQUUseURBQVc7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBVztBQUNmLEdBQUc7QUFDSDtBQUNBO0FBQ21DOzs7Ozs7O1VDN0JuQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ053QztBQUNQO0FBQ1E7QUFDekM7QUFDQSxpREFBUTtBQUNSLHNEQUFhO0FBQ2IscURBQVU7QUFDViIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY2hhbmdlU2NhbGUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jbG9jay5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUFzQ29tcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUZvb0NvbXAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVIZWFkZXJDb21wLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlTWFpblNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9kYXRhYmFzZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVNYWluU2VjdGlvblwiO1xyXG5pbXBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9IGZyb20gXCIuL2NyZWF0ZUFzQ29tcFwiO1xyXG5pbXBvcnQgeyByZW5kZXJGb290ZXJDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5cclxubGV0IGZhcmVuaGVpdCA9IGZhbHNlO1xyXG5cclxuY29uc3QgdGdsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtYnRuXCIpO1xyXG5jb25zdCBkb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvdFwiKTtcclxuY29uc3QgYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY1wiKTtcclxuY29uc3QgZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZlwiKTtcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVNjYWxlKCkge1xyXG4gICAgdGdsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+IHtcclxuICAgICAgICBpZiAoZmFyZW5oZWl0KSB7XHJcbiAgICAgICAgICAgIGZhcmVuaGVpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LnJlbW92ZShcImRvdC1jbGlja1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmYXJlbmhlaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBkb3QuY2xhc3NMaXN0LmFkZChcImRvdC1jbGlja1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlck1TQ29tcG9uZW50cyhcIjBcIik7XHJcbiAgICAgICAgcmVuZGVyQXNpZGVDb21wb25lbnQoXCIwXCIpO1xyXG4gICAgICAgIHJlbmRlckZvb3RlckNvbXBvbmVudHMoKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCB7ZmFyZW5oZWl0LCBjaGFuZ2VTY2FsZX0iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcblxyXG5jb25zdCBjbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvY2tcIik7XHJcbmxldCBtaWxpc2Vjb25kcztcclxuXHJcbmZ1bmN0aW9uIHNldENsb2NrKCkge1xyXG4gIGNvbnN0IGN1cnJlbnRUaW1lID0gbWlsaXNlY29uZHM7XHJcbiAgY29uc3QgZnVsbERhdGUgPSBuZXcgRGF0ZShjdXJyZW50VGltZSk7XHJcblxyXG4gIGxldCBoID0gZnVsbERhdGUuZ2V0SG91cnMoKTtcclxuICBsZXQgbSA9IGZ1bGxEYXRlLmdldE1pbnV0ZXMoKTtcclxuICBsZXQgcyA9IGZ1bGxEYXRlLmdldFNlY29uZHMoKTtcclxuXHJcbiAgaWYoaXNOYU4obWlsaXNlY29uZHMpIHx8IG1pbGlzZWNvbmRzID09PSB1bmRlZmluZWQpIHtcclxuICAgIGNsb2NrLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAoaCA8IDEwKSB7XHJcbiAgICBoID0gYDAke2h9YDtcclxuICB9XHJcbiAgaWYgKG0gPCAxMCkge1xyXG4gICAgbSA9IGAwJHttfWA7XHJcbiAgfVxyXG4gIGlmIChzIDwgMTApIHtcclxuICAgIHMgPSBgMCR7c31gO1xyXG4gIH1cclxuICBjbG9jay5pbm5lclRleHQgPSBgJHtofToke219OiR7c31gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlQXBpKCkge1xyXG4gIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIHtcclxuICAgIHRpbWVab25lOiBkYXRhQmFzZS5sb2NhdGlvbi50el9pZCxcclxuICAgIGhvdXJDeWNsZTogXCJoMjRcIixcclxuICAgIG1vbnRoOiBcIjItZGlnaXRcIixcclxuICAgIGRheTogXCIyLWRpZ2l0XCIsXHJcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxyXG4gICAgbWludXRlOiBcIjItZGlnaXRcIixcclxuICAgIHNlY29uZDogXCIyLWRpZ2l0XCIsXHJcbiAgICBob3VyMTI6IFwidHJ1ZVwiLFxyXG4gIH0pO1xyXG5cclxuICBtaWxpc2Vjb25kcyA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTWlsaSgpIHtcclxuICBzZXRDbG9jaygpO1xyXG4gIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIG1pbGlzZWNvbmRzICs9IDEwMDA7XHJcbiAgICB1cGRhdGVNaWxpKCk7XHJcbiAgICBzZXRDbG9jaygpO1xyXG4gIH0sIDEwMDApO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IGdldERhdGVBcGksIHVwZGF0ZU1pbGkgfTtcclxuIiwiaW1wb3J0IHsgZmFyZW5oZWl0IH0gZnJvbSBcIi4vY2hhbmdlU2NhbGVcIjtcclxuaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuY29uc3QgYXNpZGVTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hc2lkZS1zZWN0aW9uXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQXNDb21wKGhvdXIsIGljb24sIHRleHQsIHRlbXAsIGNoYW5jZVJhaW4pIHtcclxuICBjb25zdCBhc0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYXNDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImFzLWNvbXBcIik7XHJcblxyXG4gIGFzQ29tcG9uZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiYXMtY29tcC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWNsb2NrLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPHA+JHtob3VyfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXMtY29tcC1jb250XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtYWluLWljb25cIiBzcmM9XCIke2ljb259XCIgLz5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHt0ZXh0fTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj50ZW1wZXJhdHVyZTwvcD5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZW1wfTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gIGFzaWRlU2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgYXNDb21wb25lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJBc2lkZUNvbXBvbmVudChpbmRleCkge1xyXG4gIGNsZWFyQXNpZGVTZWN0aW9uKCk7XHJcbiAgY29uc3QgaG91cnMgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpbmRleF0uaG91cjtcclxuXHJcbiAgaG91cnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgaG91ciA9IGVsZW1lbnQudGltZS5zcGxpdChcIiBcIilbMV07XHJcbiAgICBjb25zdCBpY29uID0gYGh0dHBzOi8vJHtlbGVtZW50LmNvbmRpdGlvbi5pY29ufWA7XHJcbiAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC5jb25kaXRpb24udGV4dDtcclxuICAgIGxldCB0ZW1wID0gYCR7ZWxlbWVudC50ZW1wX2N9wrBDYDtcclxuICAgIGNvbnN0IGNoYW5jZVJhaW4gPSBlbGVtZW50LmNoYW5jZV9vZl9yYWluO1xyXG5cclxuICAgIGlmIChmYXJlbmhlaXQpIHtcclxuICAgICAgdGVtcCA9IGAke2VsZW1lbnQudGVtcF9mfcKwRmA7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQXNDb21wKGhvdXIsIGljb24sIHRleHQsIHRlbXAsIGNoYW5jZVJhaW4pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckFzaWRlU2VjdGlvbigpIHtcclxuICB3aGlsZSAoYXNpZGVTZWN0aW9uLmZpcnN0Q2hpbGQpIHtcclxuICAgIGFzaWRlU2VjdGlvbi5yZW1vdmVDaGlsZChhc2lkZVNlY3Rpb24uZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZU1haW5TZWN0aW9uXCI7XHJcbmltcG9ydCB7IHJlbmRlckFzaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4vY3JlYXRlQXNDb21wXCI7XHJcbmltcG9ydCB7IGZhcmVuaGVpdCB9IGZyb20gXCIuL2NoYW5nZVNjYWxlXCI7XHJcblxyXG5jb25zdCBmb290ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXItc2VjdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlckNvbXBvbmVudChkYXksIGRhdGUsIGljb24sIHRlbXAsIGNoYW5jZVJhaW4sIGlkKSB7XHJcbiAgY29uc3QgZm9vdGVyQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBmb290ZXJDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImZvby1jb21wXCIpO1xyXG4gIGZvb3RlckNvbXBvbmVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGAke2lkfWApO1xyXG5cclxuICBmb290ZXJDb21wb25lbnQuaW5uZXJIVE1MID0gYDxkaXY+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7ZGF5fTwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGxcIj4ke2RhdGV9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG5cclxuIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3RlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5jaGFuY2Ugb2YgcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHtjaGFuY2VSYWlufSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gIGZvb3RlclNlY3Rpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGZvb3RlckNvbXBvbmVudCk7XHJcblxyXG4gIGZvb3RlckNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgaW5kZXggPSBmb290ZXJDb21wb25lbnQuZGF0YXNldC5pZDtcclxuICAgIHNldEN1cnJlbnRDb21wKCk7XHJcbiAgICByZW5kZXJNU0NvbXBvbmVudHMoaW5kZXgpO1xyXG4gICAgcmVuZGVyQXNpZGVDb21wb25lbnQoaW5kZXgpO1xyXG4gIH0pO1xyXG5cclxuICBmdW5jdGlvbiBzZXRDdXJyZW50Q29tcCgpIHtcclxuICAgIGZvb3RlclNlY3Rpb24uY2hpbGROb2Rlcy5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICBjaGlsZC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgIGNoaWxkLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxuICAgIH0pO1xyXG4gICAgZm9vdGVyQ29tcG9uZW50LnN0eWxlLm9wYWNpdHkgPSBcIjAuNlwiO1xyXG4gICAgZm9vdGVyQ29tcG9uZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckZvb3RlckNvbXBvbmVudHMoKSB7XHJcbiAgY2xlYXJGb290ZXJTZWN0aW9uKCk7XHJcblxyXG4gIGNvbnN0IGRheXMgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheTtcclxuICBkYXlzLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICBjb25zdCBkYXkgPSBnZXREYXkoZWxlbWVudC5kYXRlKTtcclxuICAgIGNvbnN0IGRhdGUgPSBnZXREYXRlKGVsZW1lbnQuZGF0ZSk7XHJcbiAgICBjb25zdCBpY29uID0gYGh0dHBzOi8vJHtlbGVtZW50LmRheS5jb25kaXRpb24uaWNvbn1gO1xyXG4gICAgbGV0IHRlbXAgPSBgJHtlbGVtZW50LmRheS5hdmd0ZW1wX2N9wrBDYDtcclxuICAgIGNvbnN0IGNoYW5jZVJhaW4gPSBlbGVtZW50LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcclxuXHJcbiAgICBpZiAoZmFyZW5oZWl0KSB7XHJcbiAgICAgIHRlbXAgPSBgJHtlbGVtZW50LmRheS5hdmd0ZW1wX2Z9wrBGYDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVGb290ZXJDb21wb25lbnQoZGF5LCBkYXRlLCBpY29uLCB0ZW1wLCBjaGFuY2VSYWluLCBpbmRleCk7XHJcbiAgfSk7XHJcblxyXG4gIGluaXRDdXJyZW50KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyRm9vdGVyU2VjdGlvbigpIHtcclxuICB3aGlsZSAoZm9vdGVyU2VjdGlvbi5maXJzdENoaWxkKSB7XHJcbiAgICBmb290ZXJTZWN0aW9uLnJlbW92ZUNoaWxkKGZvb3RlclNlY3Rpb24uZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0Q3VycmVudCgpIHtcclxuICBjb25zdCBpbml0ID0gZm9vdGVyU2VjdGlvbi5jaGlsZE5vZGVzWzBdO1xyXG4gIGluaXQuc3R5bGUub3BhY2l0eSA9IFwiMC42XCI7XHJcbiAgaW5pdC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGUoZGF0ZSkge1xyXG4gIGNvbnN0IGZ1bGxEYXRlID0gZGF0ZS5zcGxpdChcIi1cIik7XHJcblxyXG4gIGNvbnN0IGRheSA9IGZ1bGxEYXRlWzJdO1xyXG4gIGNvbnN0IG1vbnRoID0gZnVsbERhdGVbMV07XHJcbiAgY29uc3QgeWVhciA9IGZ1bGxEYXRlWzBdO1xyXG5cclxuICByZXR1cm4gYCR7bW9udGh9LyR7ZGF5fS8ke3llYXJ9YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5KGRhdGUpIHtcclxuICBjb25zdCB3ZWVrID0gW1wiTW9uXCIsIFwiVHVlXCIsIFwiV2VkXCIsIFwiVGh1XCIsIFwiRnJpXCIsIFwiU2F0XCIsIFwiU3VuXCJdO1xyXG4gIGNvbnN0IHdlZWtEYXkgPSBuZXcgRGF0ZShkYXRlKS5nZXREYXkoKTtcclxuICBjb25zdCBkYXkgPSB3ZWVrW3dlZWtEYXldO1xyXG5cclxuICByZXR1cm4gZGF5O1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJGb290ZXJDb21wb25lbnRzLCBnZXREYXRlIH07XHJcbiIsImltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmZ1bmN0aW9uIHNldEhlYWRlckluZm8obmFtZSwgc3VidCwgZGF0ZSkge1xyXG4gIGNvbnN0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY3VycmVudC1jaXR5XCIpO1xyXG4gIGNvbnN0IHN1YnRUdGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lvbi1jb3VudHJ5XCIpO1xyXG4gIGNvbnN0IGN1cnJlbnREYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50LWRhdGVcIik7XHJcblxyXG4gIG1haW5UaXRsZS5pbm5lclRleHQgPSBuYW1lO1xyXG4gIHN1YnRUdGwuaW5uZXJUZXh0ID0gc3VidDtcclxuICBjdXJyZW50RGF0ZS5pbm5lclRleHQgPSBkYXRlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzcGxpdERhdGUoZGF0ZSkge1xyXG4gICAgY29uc3QgYXJEYXRlID0gZGF0ZS5zcGxpdChcIiBcIik7XHJcblxyXG4gICAgcmV0dXJuIGFyRGF0ZVswXTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVySGVhZGVyKCkge1xyXG4gIGNvbnN0IG5hbWUgPSBkYXRhQmFzZS5sb2NhdGlvbi5uYW1lO1xyXG4gIGNvbnN0IHN1YnQgPSBgJHtkYXRhQmFzZS5sb2NhdGlvbi5yZWdpb259IC0gJHtkYXRhQmFzZS5sb2NhdGlvbi5jb3VudHJ5fWA7XHJcbiAgY29uc3QgZGF0ZSA9IGdldERhdGUoc3BsaXREYXRlKGRhdGFCYXNlLmxvY2F0aW9uLmxvY2FsdGltZSkpO1xyXG5cclxuICBzZXRIZWFkZXJJbmZvKG5hbWUsIHN1YnQsIGRhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJIZWFkZXIgfTtcclxuIiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyBnZXREYXRlIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5pbXBvcnQgeyBmYXJlbmhlaXQgfSBmcm9tIFwiLi9jaGFuZ2VTY2FsZVwiO1xyXG5cclxuY29uc3QgbWFpblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tc2VjdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1TQ29tcG9uZW50cyhcclxuICB0aXRsZSxcclxuICBkYXRlLFxyXG4gIGljb24sXHJcbiAgdGV4dCxcclxuICB0ZW1wLFxyXG4gIGZlZWxzTGlrZSxcclxuICBtYXhUZW1wLFxyXG4gIG1pblRlbXAsXHJcbiAgY2hhbmNlUmFpbixcclxuICBwcmVjaXBpdGF0aW9uLFxyXG4gIHdpbmRTcGVlZCxcclxuICBodW1pZGl0eSxcclxuICBzdW5yaXNlLFxyXG4gIHN1bnNldFxyXG4pIHtcclxuICBtYWluU2VjdGlvbi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cIndyLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxoMSBjbGFzcz1cIm1haW4tc3VidFwiPiR7dGl0bGV9PC9oMT5cclxuICAgICAgICAgICAgICA8cD4ke2RhdGV9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHt0ZXh0fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwid3ItY29udGVudFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmZlZWxzIGxpa2U8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2ZlZWxzTGlrZX08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItdXAtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5tYXg8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke21heFRlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci1kb3duLTUwLnBuZ1wiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5taW48L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke21pblRlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5jaGFuY2Ugb2YgcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWh5Z3JvbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5wcmVjaXBpdGF0aW9uPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtwcmVjaXBpdGF0aW9ufTxzcGFuIGNsYXNzPVwiX3NtYWxsXCI+bW08L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXdpbmQtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj53aW5kIHNwZWVkPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt3aW5kU3BlZWR9PHNwYW4gY2xhc3M9XCJfc21hbGxcIj5rbS9oPC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1kcm9wLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+aHVtaWRpdHk8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2h1bWlkaXR5fSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtc3VucmlzZS01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnN1bnJpc2U8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7c3VucmlzZX08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtc3Vuc2V0LTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+c3Vuc2V0PC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3N1bnNldH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF5KGRhdGUpIHtcclxuICBjb25zdCB3ZWVrID0gW1xyXG4gICAgXCJNb25kYXlcIixcclxuICAgIFwiVHVlc2RheVwiLFxyXG4gICAgXCJXZWRuZXNkYXlcIixcclxuICAgIFwiVGh1cnNkYXlcIixcclxuICAgIFwiRnJpZGF5XCIsXHJcbiAgICBcIlNhdHVyZGF5XCIsXHJcbiAgICBcIlN1bmRheVwiLFxyXG4gIF07XHJcbiAgY29uc3Qgd2Vla0RheSA9IG5ldyBEYXRlKGRhdGUpLmdldERheSgpO1xyXG4gIGNvbnN0IGRheSA9IHdlZWtbd2Vla0RheV07XHJcblxyXG4gIHJldHVybiBkYXk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEhvdXIoaG91cikge1xyXG4gIGNvbnN0IGFySG91ciA9IGhvdXIuc3BsaXQoXCIgXCIpO1xyXG4gIHJldHVybiBgJHthckhvdXJbMF19PHNwYW4gY2xhc3M9XCJfc21hbGxcIj4ke2FySG91clsxXX08L3NwYW4+YDtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyTVNDb21wb25lbnRzKGluZGV4KSB7XHJcbiAgY29uc3QgdGFyZ2V0ID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaW5kZXhdO1xyXG4gIGNvbnN0IHRpdGxlID0gZ2V0RGF5KHRhcmdldC5kYXRlKTtcclxuICBjb25zdCBkYXRlID0gZ2V0RGF0ZSh0YXJnZXQuZGF0ZSk7XHJcbiAgY29uc3QgaWNvbiA9IGBodHRwczovLyR7dGFyZ2V0LmRheS5jb25kaXRpb24uaWNvbn1gO1xyXG4gIGNvbnN0IHRleHQgPSB0YXJnZXQuZGF5LmNvbmRpdGlvbi50ZXh0O1xyXG5cclxuICBsZXQgdGVtcCA9IGAke3RhcmdldC5kYXkuYXZndGVtcF9jfcKwQ2A7IDtcclxuICBsZXQgZmVlbHNMaWtlID0gXCItLy1cIjtcclxuICBsZXQgbWF4VGVtcCA9IGAke3RhcmdldC5kYXkubWF4dGVtcF9jfcKwQ2A7XHJcbiAgbGV0IG1pblRlbXAgPSBgJHt0YXJnZXQuZGF5Lm1pbnRlbXBfY33CsENgO1xyXG5cclxuICBjb25zdCBjaGFuY2VSYWluID0gdGFyZ2V0LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcclxuICBjb25zdCBwcmVjaXBpdGF0aW9uID0gdGFyZ2V0LmRheS50b3RhbHByZWNpcF9tbTtcclxuICBsZXQgd2luZFNwZWVkID0gXCItLy1cIjtcclxuICBjb25zdCBodW1pZGl0eSA9IHRhcmdldC5kYXkuYXZnaHVtaWRpdHk7XHJcblxyXG4gIGNvbnN0IHN1bnJpc2UgPSBzZXRIb3VyKHRhcmdldC5hc3Ryby5zdW5yaXNlKTtcclxuICBjb25zdCBzdW5zZXQgPSBzZXRIb3VyKHRhcmdldC5hc3Ryby5zdW5zZXQpO1xyXG5cclxuICBpZiAoZmFyZW5oZWl0KSB7XHJcbiAgICB0ZW1wID0gYCR7dGFyZ2V0LmRheS5hdmd0ZW1wX2Z9wrBGYDtcclxuICAgIG1heFRlbXAgPSBgJHt0YXJnZXQuZGF5Lm1heHRlbXBfZn3CsEZgO1xyXG4gICAgbWluVGVtcCA9IGAke3RhcmdldC5kYXkubWludGVtcF9mfcKwRmA7XHJcbiAgfVxyXG5cclxuICBpZiAoaW5kZXggPT09IFwiMFwiKSB7XHJcbiAgICB3aW5kU3BlZWQgPSBkYXRhQmFzZS5jdXJyZW50LndpbmRfa3BoO1xyXG4gICAgaWYgKGZhcmVuaGVpdCkge1xyXG4gICAgICB0ZW1wID0gYCR7ZGF0YUJhc2UuY3VycmVudC50ZW1wX2Z9wrBGYDtcclxuICAgICAgZmVlbHNMaWtlID1gJHtkYXRhQmFzZS5jdXJyZW50LmZlZWxzbGlrZV9mfcKwRmAgO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGVtcCA9IGAke2RhdGFCYXNlLmN1cnJlbnQudGVtcF9jfcKwQ2A7XHJcbiAgICAgIGZlZWxzTGlrZSA9IGAke2RhdGFCYXNlLmN1cnJlbnQuZmVlbHNsaWtlX2N9wrBDYDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZU1TQ29tcG9uZW50cyhcclxuICAgIHRpdGxlLFxyXG4gICAgZGF0ZSxcclxuICAgIGljb24sXHJcbiAgICB0ZXh0LFxyXG4gICAgdGVtcCxcclxuICAgIGZlZWxzTGlrZSxcclxuICAgIG1heFRlbXAsXHJcbiAgICBtaW5UZW1wLFxyXG4gICAgY2hhbmNlUmFpbixcclxuICAgIHByZWNpcGl0YXRpb24sXHJcbiAgICB3aW5kU3BlZWQsXHJcbiAgICBodW1pZGl0eSxcclxuICAgIHN1bnJpc2UsXHJcbiAgICBzdW5zZXRcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfTtcclxuIiwibGV0IGRhdGFCYXNlO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YSh2YWx1ZSkge1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICBgaHR0cDovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT1jNTVlYmY4OTVkYTg0OTY5OTFmMjIyMDQyMjMxODA5JnE9JHt2YWx1ZX0mZGF5cz0xMCZhcWk9bm8mYWxlcnRzPW5vYFxyXG4gICk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgZGF0YUJhc2UgPSBkYXRhO1xyXG59XHJcblxyXG5leHBvcnQge2RhdGFCYXNlLCBnZXREYXRhfSIsImltcG9ydCB7IGRhdGFCYXNlLCBnZXREYXRhIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgcmVuZGVyQXNpZGVDb21wb25lbnQgfSBmcm9tIFwiLi9jcmVhdGVBc0NvbXBcIjtcclxuaW1wb3J0IHsgcmVuZGVyRm9vdGVyQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZUZvb0NvbXBcIjtcclxuaW1wb3J0IHsgcmVuZGVyTVNDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlTWFpblNlY3Rpb25cIjtcclxuaW1wb3J0IHsgcmVuZGVySGVhZGVyIH0gZnJvbSBcIi4vY3JlYXRlSGVhZGVyQ29tcFwiO1xyXG5pbXBvcnQgeyBnZXREYXRlQXBpIH0gZnJvbSBcIi4vY2xvY2tcIjtcclxuaW1wb3J0IHsgY2hhbmdlU2NhbGUgfSBmcm9tIFwiLi9jaGFuZ2VTY2FsZVwiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZG9UaGluZ3ModmFsdWUpIHtcclxuICBhd2FpdCBnZXREYXRhKHZhbHVlKTtcclxuICBjb25zb2xlLmxvZyhkYXRhQmFzZSk7IC8vZGlzcGxheSB0aGluZ3MgLT4gd2FpdCBmb3IgZGF0YVxyXG4gIGdldERhdGVBcGkoKTtcclxuICByZW5kZXJIZWFkZXIoKTtcclxuICByZW5kZXJNU0NvbXBvbmVudHMoXCIwXCIpO1xyXG4gIHJlbmRlckFzaWRlQ29tcG9uZW50KFwiMFwiKTtcclxuICByZW5kZXJGb290ZXJDb21wb25lbnRzKCk7XHJcbiAgY2hhbmdlU2NhbGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VhcmNoT25DbGljaygpIHtcclxuICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpO1xyXG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuXCIpO1xyXG5cclxuICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGRvVGhpbmdzKHNlYXJjaElucHV0LnZhbHVlKTtcclxuICAgIGNoYW5nZVNjYWxlKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRvVGhpbmdzLCBzZWFyY2hPbkNsaWNrIH07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgdXBkYXRlTWlsaSB9IGZyb20gXCIuL2Nsb2NrLmpzXCI7XHJcbmltcG9ydCB7ZG9UaGluZ3N9IGZyb20gXCIuL2RvbS5qc1wiXHJcbmltcG9ydCB7IHNlYXJjaE9uQ2xpY2sgfSBmcm9tIFwiLi9kb20uanNcIjtcclxuXHJcbmRvVGhpbmdzKFwibG9uZG9uXCIpO1xyXG5zZWFyY2hPbkNsaWNrKCk7XHJcbnVwZGF0ZU1pbGkoKTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==