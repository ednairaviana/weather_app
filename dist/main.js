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

        (0,_createMainSection__WEBPACK_IMPORTED_MODULE_0__.renderMSComponents)(_createFooComp__WEBPACK_IMPORTED_MODULE_2__.currentCompIndex);
        (0,_createFooComp__WEBPACK_IMPORTED_MODULE_2__.initCurrent)();
        (0,_createAsComp__WEBPACK_IMPORTED_MODULE_1__.renderAsideComponent)(_createFooComp__WEBPACK_IMPORTED_MODULE_2__.currentCompIndex);
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
/* harmony export */   currentCompIndex: () => (/* binding */ currentCompIndex),
/* harmony export */   getDate: () => (/* binding */ getDate),
/* harmony export */   initCurrent: () => (/* binding */ initCurrent),
/* harmony export */   renderFooterComponents: () => (/* binding */ renderFooterComponents)
/* harmony export */ });
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./database */ "./src/database.js");
/* harmony import */ var _createMainSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createMainSection */ "./src/createMainSection.js");
/* harmony import */ var _createAsComp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createAsComp */ "./src/createAsComp.js");
/* harmony import */ var _changeScale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./changeScale */ "./src/changeScale.js");





const footerSection = document.querySelector(".footer-section");
let currentCompIndex = "0"

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
    currentCompIndex = index;
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
  const init = footerSection.childNodes[currentCompIndex];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzhCOzs7Ozs7Ozs7Ozs7Ozs7O0FDbk05QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdGQUF3RixNQUFNO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWK0M7QUFDTztBQUNHO0FBQ0E7QUFDUDtBQUNiO0FBQ087QUFDNUM7QUFDQTtBQUNBLFFBQVEsa0RBQU87QUFDZixjQUFjLCtDQUFRLEdBQUc7QUFDekIsRUFBRSxrREFBVTtBQUNaLEVBQUUsK0RBQVk7QUFDZCxFQUFFLHNFQUFrQjtBQUNwQixFQUFFLG1FQUFvQjtBQUN0QixFQUFFLHNFQUFzQjtBQUN4QixFQUFFLHlEQUFXO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkseURBQVc7QUFDZixHQUFHO0FBQ0g7QUFDQTtBQUNtQzs7Ozs7OztVQzdCbkM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOd0M7QUFDUDtBQUNRO0FBQ3pDO0FBQ0EsaURBQVE7QUFDUixzREFBYTtBQUNiLHFEQUFVO0FBQ1YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NoYW5nZVNjYWxlLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY2xvY2suanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVBc0NvbXAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVGb29Db21wLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlSGVhZGVyQ29tcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZU1haW5TZWN0aW9uLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvZGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyTVNDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlTWFpblNlY3Rpb25cIjtcclxuaW1wb3J0IHsgcmVuZGVyQXNpZGVDb21wb25lbnQgfSBmcm9tIFwiLi9jcmVhdGVBc0NvbXBcIjtcclxuaW1wb3J0IHsgaW5pdEN1cnJlbnQsIHJlbmRlckZvb3RlckNvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IGN1cnJlbnRDb21wSW5kZXggfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcblxyXG5sZXQgZmFyZW5oZWl0ID0gZmFsc2U7XHJcblxyXG5jb25zdCB0Z2xCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZ2dsZS1idG5cIik7XHJcbmNvbnN0IGRvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZG90XCIpO1xyXG5jb25zdCBjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjXCIpO1xyXG5jb25zdCBmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmXCIpO1xyXG5cclxuZnVuY3Rpb24gY2hhbmdlU2NhbGUoKSB7XHJcbiAgICB0Z2xCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT4ge1xyXG4gICAgICAgIGlmIChmYXJlbmhlaXQpIHtcclxuICAgICAgICAgICAgZmFyZW5oZWl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGRvdC5jbGFzc0xpc3QucmVtb3ZlKFwiZG90LWNsaWNrXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZhcmVuaGVpdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRvdC5jbGFzc0xpc3QuYWRkKFwiZG90LWNsaWNrXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyTVNDb21wb25lbnRzKGN1cnJlbnRDb21wSW5kZXgpO1xyXG4gICAgICAgIGluaXRDdXJyZW50KCk7XHJcbiAgICAgICAgcmVuZGVyQXNpZGVDb21wb25lbnQoY3VycmVudENvbXBJbmRleCk7XHJcbiAgICAgICAgcmVuZGVyRm9vdGVyQ29tcG9uZW50cygpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IHtmYXJlbmhlaXQsIGNoYW5nZVNjYWxlfSIsImltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuXHJcbmNvbnN0IGNsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjbG9ja1wiKTtcclxubGV0IG1pbGlzZWNvbmRzO1xyXG5cclxuZnVuY3Rpb24gc2V0Q2xvY2soKSB7XHJcbiAgY29uc3QgY3VycmVudFRpbWUgPSBtaWxpc2Vjb25kcztcclxuICBjb25zdCBmdWxsRGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnRUaW1lKTtcclxuXHJcbiAgbGV0IGggPSBmdWxsRGF0ZS5nZXRIb3VycygpO1xyXG4gIGxldCBtID0gZnVsbERhdGUuZ2V0TWludXRlcygpO1xyXG4gIGxldCBzID0gZnVsbERhdGUuZ2V0U2Vjb25kcygpO1xyXG5cclxuICBpZihpc05hTihtaWxpc2Vjb25kcykgfHwgbWlsaXNlY29uZHMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgY2xvY2suaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGlmIChoIDwgMTApIHtcclxuICAgIGggPSBgMCR7aH1gO1xyXG4gIH1cclxuICBpZiAobSA8IDEwKSB7XHJcbiAgICBtID0gYDAke219YDtcclxuICB9XHJcbiAgaWYgKHMgPCAxMCkge1xyXG4gICAgcyA9IGAwJHtzfWA7XHJcbiAgfVxyXG4gIGNsb2NrLmlubmVyVGV4dCA9IGAke2h9OiR7bX06JHtzfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERhdGVBcGkoKSB7XHJcbiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKFwiZW4tVVNcIiwge1xyXG4gICAgdGltZVpvbmU6IGRhdGFCYXNlLmxvY2F0aW9uLnR6X2lkLFxyXG4gICAgaG91ckN5Y2xlOiBcImgyNFwiLFxyXG4gICAgbW9udGg6IFwiMi1kaWdpdFwiLFxyXG4gICAgZGF5OiBcIjItZGlnaXRcIixcclxuICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgaG91cjogXCIyLWRpZ2l0XCIsXHJcbiAgICBtaW51dGU6IFwiMi1kaWdpdFwiLFxyXG4gICAgc2Vjb25kOiBcIjItZGlnaXRcIixcclxuICAgIGhvdXIxMjogXCJ0cnVlXCIsXHJcbiAgfSk7XHJcblxyXG4gIG1pbGlzZWNvbmRzID0gbmV3IERhdGUoZGF0ZSkuZ2V0VGltZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVNaWxpKCkge1xyXG4gIHNldENsb2NrKCk7XHJcbiAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgbWlsaXNlY29uZHMgKz0gMTAwMDtcclxuICAgIHVwZGF0ZU1pbGkoKTtcclxuICAgIHNldENsb2NrKCk7XHJcbiAgfSwgMTAwMCk7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgZ2V0RGF0ZUFwaSwgdXBkYXRlTWlsaSB9O1xyXG4iLCJpbXBvcnQgeyBmYXJlbmhlaXQgfSBmcm9tIFwiLi9jaGFuZ2VTY2FsZVwiO1xyXG5pbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcblxyXG5jb25zdCBhc2lkZVNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFzaWRlLXNlY3Rpb25cIik7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVBc0NvbXAoaG91ciwgaWNvbiwgdGV4dCwgdGVtcCwgY2hhbmNlUmFpbikge1xyXG4gIGNvbnN0IGFzQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBhc0NvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiYXMtY29tcFwiKTtcclxuXHJcbiAgYXNDb21wb25lbnQuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJhcy1jb21wLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtY2xvY2stNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8cD4ke2hvdXJ9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcy1jb21wLWNvbnRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3RleHR9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3RlbXB9PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtcmFpbi01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5jaGFuY2Ugb2YgcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtjaGFuY2VSYWlufSU8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuXHJcbiAgYXNpZGVTZWN0aW9uLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBhc0NvbXBvbmVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlckFzaWRlQ29tcG9uZW50KGluZGV4KSB7XHJcbiAgY2xlYXJBc2lkZVNlY3Rpb24oKTtcclxuICBjb25zdCBob3VycyA9IGRhdGFCYXNlLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2luZGV4XS5ob3VyO1xyXG5cclxuICBob3Vycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICBjb25zdCBob3VyID0gZWxlbWVudC50aW1lLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgIGNvbnN0IGljb24gPSBgaHR0cHM6Ly8ke2VsZW1lbnQuY29uZGl0aW9uLmljb259YDtcclxuICAgIGNvbnN0IHRleHQgPSBlbGVtZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgbGV0IHRlbXAgPSBgJHtlbGVtZW50LnRlbXBfY33CsENgO1xyXG4gICAgY29uc3QgY2hhbmNlUmFpbiA9IGVsZW1lbnQuY2hhbmNlX29mX3JhaW47XHJcblxyXG4gICAgaWYgKGZhcmVuaGVpdCkge1xyXG4gICAgICB0ZW1wID0gYCR7ZWxlbWVudC50ZW1wX2Z9wrBGYDtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVBc0NvbXAoaG91ciwgaWNvbiwgdGV4dCwgdGVtcCwgY2hhbmNlUmFpbik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsZWFyQXNpZGVTZWN0aW9uKCkge1xyXG4gIHdoaWxlIChhc2lkZVNlY3Rpb24uZmlyc3RDaGlsZCkge1xyXG4gICAgYXNpZGVTZWN0aW9uLnJlbW92ZUNoaWxkKGFzaWRlU2VjdGlvbi5maXJzdENoaWxkKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlckFzaWRlQ29tcG9uZW50IH07XHJcbiIsImltcG9ydCB7IGRhdGFCYXNlIH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcclxuaW1wb3J0IHsgcmVuZGVyTVNDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlTWFpblNlY3Rpb25cIjtcclxuaW1wb3J0IHsgcmVuZGVyQXNpZGVDb21wb25lbnQgfSBmcm9tIFwiLi9jcmVhdGVBc0NvbXBcIjtcclxuaW1wb3J0IHsgZmFyZW5oZWl0IH0gZnJvbSBcIi4vY2hhbmdlU2NhbGVcIjtcclxuXHJcbmNvbnN0IGZvb3RlclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3Rlci1zZWN0aW9uXCIpO1xyXG5sZXQgY3VycmVudENvbXBJbmRleCA9IFwiMFwiXHJcblxyXG5mdW5jdGlvbiBjcmVhdGVGb290ZXJDb21wb25lbnQoZGF5LCBkYXRlLCBpY29uLCB0ZW1wLCBjaGFuY2VSYWluLCBpZCkge1xyXG4gIGNvbnN0IGZvb3RlckNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgZm9vdGVyQ29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJmb28tY29tcFwiKTtcclxuICBmb290ZXJDb21wb25lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBgJHtpZH1gKTtcclxuXHJcbiAgZm9vdGVyQ29tcG9uZW50LmlubmVySFRNTCA9IGA8ZGl2PlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke2RheX08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsXCI+JHtkYXRlfTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJtYWluLWljb25cIiBzcmM9XCIke2ljb259XCIgLz5cclxuXHJcbiBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtdGhlcm1vbWV0ZXItNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj50ZW1wZXJhdHVyZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHt0ZW1wfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1yYWluLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG5cclxuICBmb290ZXJTZWN0aW9uLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBmb290ZXJDb21wb25lbnQpO1xyXG5cclxuICBmb290ZXJDb21wb25lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGluZGV4ID0gZm9vdGVyQ29tcG9uZW50LmRhdGFzZXQuaWQ7XHJcbiAgICBzZXRDdXJyZW50Q29tcCgpO1xyXG4gICAgcmVuZGVyTVNDb21wb25lbnRzKGluZGV4KTtcclxuICAgIHJlbmRlckFzaWRlQ29tcG9uZW50KGluZGV4KTtcclxuICAgIGN1cnJlbnRDb21wSW5kZXggPSBpbmRleDtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gc2V0Q3VycmVudENvbXAoKSB7XHJcbiAgICBmb290ZXJTZWN0aW9uLmNoaWxkTm9kZXMuZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgY2hpbGQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICBjaGlsZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbiAgICB9KTtcclxuICAgIGZvb3RlckNvbXBvbmVudC5zdHlsZS5vcGFjaXR5ID0gXCIwLjZcIjtcclxuICAgIGZvb3RlckNvbXBvbmVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJGb290ZXJDb21wb25lbnRzKCkge1xyXG4gIGNsZWFyRm9vdGVyU2VjdGlvbigpO1xyXG5cclxuICBjb25zdCBkYXlzID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXk7XHJcbiAgZGF5cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgZGF5ID0gZ2V0RGF5KGVsZW1lbnQuZGF0ZSk7XHJcbiAgICBjb25zdCBkYXRlID0gZ2V0RGF0ZShlbGVtZW50LmRhdGUpO1xyXG4gICAgY29uc3QgaWNvbiA9IGBodHRwczovLyR7ZWxlbWVudC5kYXkuY29uZGl0aW9uLmljb259YDtcclxuICAgIGxldCB0ZW1wID0gYCR7ZWxlbWVudC5kYXkuYXZndGVtcF9jfcKwQ2A7XHJcbiAgICBjb25zdCBjaGFuY2VSYWluID0gZWxlbWVudC5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XHJcblxyXG4gICAgaWYgKGZhcmVuaGVpdCkge1xyXG4gICAgICB0ZW1wID0gYCR7ZWxlbWVudC5kYXkuYXZndGVtcF9mfcKwRmA7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRm9vdGVyQ29tcG9uZW50KGRheSwgZGF0ZSwgaWNvbiwgdGVtcCwgY2hhbmNlUmFpbiwgaW5kZXgpO1xyXG4gIH0pO1xyXG5cclxuICBpbml0Q3VycmVudCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckZvb3RlclNlY3Rpb24oKSB7XHJcbiAgd2hpbGUgKGZvb3RlclNlY3Rpb24uZmlyc3RDaGlsZCkge1xyXG4gICAgZm9vdGVyU2VjdGlvbi5yZW1vdmVDaGlsZChmb290ZXJTZWN0aW9uLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEN1cnJlbnQoKSB7XHJcbiAgY29uc3QgaW5pdCA9IGZvb3RlclNlY3Rpb24uY2hpbGROb2Rlc1tjdXJyZW50Q29tcEluZGV4XTtcclxuICBpbml0LnN0eWxlLm9wYWNpdHkgPSBcIjAuNlwiO1xyXG4gIGluaXQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlKGRhdGUpIHtcclxuICBjb25zdCBmdWxsRGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpO1xyXG5cclxuICBjb25zdCBkYXkgPSBmdWxsRGF0ZVsyXTtcclxuICBjb25zdCBtb250aCA9IGZ1bGxEYXRlWzFdO1xyXG4gIGNvbnN0IHllYXIgPSBmdWxsRGF0ZVswXTtcclxuXHJcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheShkYXRlKSB7XHJcbiAgY29uc3Qgd2VlayA9IFtcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiLCBcIlN1blwiXTtcclxuICBjb25zdCB3ZWVrRGF5ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KCk7XHJcbiAgY29uc3QgZGF5ID0gd2Vla1t3ZWVrRGF5XTtcclxuXHJcbiAgcmV0dXJuIGRheTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVuZGVyRm9vdGVyQ29tcG9uZW50cywgZ2V0RGF0ZSwgY3VycmVudENvbXBJbmRleCwgaW5pdEN1cnJlbnQgfTtcclxuIiwiaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCIuL2NyZWF0ZUZvb0NvbXBcIjtcclxuaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuZnVuY3Rpb24gc2V0SGVhZGVySW5mbyhuYW1lLCBzdWJ0LCBkYXRlKSB7XHJcbiAgY29uc3QgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50LWNpdHlcIik7XHJcbiAgY29uc3Qgc3VidFR0bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaW9uLWNvdW50cnlcIik7XHJcbiAgY29uc3QgY3VycmVudERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnQtZGF0ZVwiKTtcclxuXHJcbiAgbWFpblRpdGxlLmlubmVyVGV4dCA9IG5hbWU7XHJcbiAgc3VidFR0bC5pbm5lclRleHQgPSBzdWJ0O1xyXG4gIGN1cnJlbnREYXRlLmlubmVyVGV4dCA9IGRhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNwbGl0RGF0ZShkYXRlKSB7XHJcbiAgICBjb25zdCBhckRhdGUgPSBkYXRlLnNwbGl0KFwiIFwiKTtcclxuXHJcbiAgICByZXR1cm4gYXJEYXRlWzBdO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJIZWFkZXIoKSB7XHJcbiAgY29uc3QgbmFtZSA9IGRhdGFCYXNlLmxvY2F0aW9uLm5hbWU7XHJcbiAgY29uc3Qgc3VidCA9IGAke2RhdGFCYXNlLmxvY2F0aW9uLnJlZ2lvbn0gLSAke2RhdGFCYXNlLmxvY2F0aW9uLmNvdW50cnl9YDtcclxuICBjb25zdCBkYXRlID0gZ2V0RGF0ZShzcGxpdERhdGUoZGF0YUJhc2UubG9jYXRpb24ubG9jYWx0aW1lKSk7XHJcblxyXG4gIHNldEhlYWRlckluZm8obmFtZSwgc3VidCwgZGF0ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlckhlYWRlciB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IGZhcmVuaGVpdCB9IGZyb20gXCIuL2NoYW5nZVNjYWxlXCI7XHJcblxyXG5jb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlTVNDb21wb25lbnRzKFxyXG4gIHRpdGxlLFxyXG4gIGRhdGUsXHJcbiAgaWNvbixcclxuICB0ZXh0LFxyXG4gIHRlbXAsXHJcbiAgZmVlbHNMaWtlLFxyXG4gIG1heFRlbXAsXHJcbiAgbWluVGVtcCxcclxuICBjaGFuY2VSYWluLFxyXG4gIHByZWNpcGl0YXRpb24sXHJcbiAgd2luZFNwZWVkLFxyXG4gIGh1bWlkaXR5LFxyXG4gIHN1bnJpc2UsXHJcbiAgc3Vuc2V0XHJcbikge1xyXG4gIG1haW5TZWN0aW9uLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwid3ItaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGgxIGNsYXNzPVwibWFpbi1zdWJ0XCI+JHt0aXRsZX08L2gxPlxyXG4gICAgICAgICAgICAgIDxwPiR7ZGF0ZX08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibWFpbi1pY29uXCIgc3JjPVwiJHtpY29ufVwiIC8+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3RleHR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ci1jb250ZW50XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+dGVtcGVyYXR1cmU8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3RlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+ZmVlbHMgbGlrZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7ZmVlbHNMaWtlfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci11cC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPm1heDwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7bWF4VGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLWRvd24tNTAucG5nXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPm1pbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7bWluVGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtcmFpbi01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmNoYW5jZSBvZiByYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtjaGFuY2VSYWlufSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtaHlncm9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnByZWNpcGl0YXRpb248L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3ByZWNpcGl0YXRpb259PHNwYW4gY2xhc3M9XCJfc21hbGxcIj5tbTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtd2luZC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPndpbmQgc3BlZWQ8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3dpbmRTcGVlZH08c3BhbiBjbGFzcz1cIl9zbWFsbFwiPmttL2g8L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWRyb3AtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5odW1pZGl0eTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7aHVtaWRpdHl9JTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1zdW5yaXNlLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+c3VucmlzZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHtzdW5yaXNlfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1zdW5zZXQtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5zdW5zZXQ8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7c3Vuc2V0fTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXkoZGF0ZSkge1xyXG4gIGNvbnN0IHdlZWsgPSBbXHJcbiAgICBcIk1vbmRheVwiLFxyXG4gICAgXCJUdWVzZGF5XCIsXHJcbiAgICBcIldlZG5lc2RheVwiLFxyXG4gICAgXCJUaHVyc2RheVwiLFxyXG4gICAgXCJGcmlkYXlcIixcclxuICAgIFwiU2F0dXJkYXlcIixcclxuICAgIFwiU3VuZGF5XCIsXHJcbiAgXTtcclxuICBjb25zdCB3ZWVrRGF5ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KCk7XHJcbiAgY29uc3QgZGF5ID0gd2Vla1t3ZWVrRGF5XTtcclxuXHJcbiAgcmV0dXJuIGRheTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0SG91cihob3VyKSB7XHJcbiAgY29uc3QgYXJIb3VyID0gaG91ci5zcGxpdChcIiBcIik7XHJcbiAgcmV0dXJuIGAke2FySG91clswXX08c3BhbiBjbGFzcz1cIl9zbWFsbFwiPiR7YXJIb3VyWzFdfTwvc3Bhbj5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJNU0NvbXBvbmVudHMoaW5kZXgpIHtcclxuICBjb25zdCB0YXJnZXQgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpbmRleF07XHJcbiAgY29uc3QgdGl0bGUgPSBnZXREYXkodGFyZ2V0LmRhdGUpO1xyXG4gIGNvbnN0IGRhdGUgPSBnZXREYXRlKHRhcmdldC5kYXRlKTtcclxuICBjb25zdCBpY29uID0gYGh0dHBzOi8vJHt0YXJnZXQuZGF5LmNvbmRpdGlvbi5pY29ufWA7XHJcbiAgY29uc3QgdGV4dCA9IHRhcmdldC5kYXkuY29uZGl0aW9uLnRleHQ7XHJcblxyXG4gIGxldCB0ZW1wID0gYCR7dGFyZ2V0LmRheS5hdmd0ZW1wX2N9wrBDYDsgO1xyXG4gIGxldCBmZWVsc0xpa2UgPSBcIi0vLVwiO1xyXG4gIGxldCBtYXhUZW1wID0gYCR7dGFyZ2V0LmRheS5tYXh0ZW1wX2N9wrBDYDtcclxuICBsZXQgbWluVGVtcCA9IGAke3RhcmdldC5kYXkubWludGVtcF9jfcKwQ2A7XHJcblxyXG4gIGNvbnN0IGNoYW5jZVJhaW4gPSB0YXJnZXQuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb24gPSB0YXJnZXQuZGF5LnRvdGFscHJlY2lwX21tO1xyXG4gIGxldCB3aW5kU3BlZWQgPSBcIi0vLVwiO1xyXG4gIGNvbnN0IGh1bWlkaXR5ID0gdGFyZ2V0LmRheS5hdmdodW1pZGl0eTtcclxuXHJcbiAgY29uc3Qgc3VucmlzZSA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnJpc2UpO1xyXG4gIGNvbnN0IHN1bnNldCA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnNldCk7XHJcblxyXG4gIGlmIChmYXJlbmhlaXQpIHtcclxuICAgIHRlbXAgPSBgJHt0YXJnZXQuZGF5LmF2Z3RlbXBfZn3CsEZgO1xyXG4gICAgbWF4VGVtcCA9IGAke3RhcmdldC5kYXkubWF4dGVtcF9mfcKwRmA7XHJcbiAgICBtaW5UZW1wID0gYCR7dGFyZ2V0LmRheS5taW50ZW1wX2Z9wrBGYDtcclxuICB9XHJcblxyXG4gIGlmIChpbmRleCA9PT0gXCIwXCIpIHtcclxuICAgIHdpbmRTcGVlZCA9IGRhdGFCYXNlLmN1cnJlbnQud2luZF9rcGg7XHJcbiAgICBpZiAoZmFyZW5oZWl0KSB7XHJcbiAgICAgIHRlbXAgPSBgJHtkYXRhQmFzZS5jdXJyZW50LnRlbXBfZn3CsEZgO1xyXG4gICAgICBmZWVsc0xpa2UgPWAke2RhdGFCYXNlLmN1cnJlbnQuZmVlbHNsaWtlX2Z9wrBGYCA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZW1wID0gYCR7ZGF0YUJhc2UuY3VycmVudC50ZW1wX2N9wrBDYDtcclxuICAgICAgZmVlbHNMaWtlID0gYCR7ZGF0YUJhc2UuY3VycmVudC5mZWVsc2xpa2VfY33CsENgO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlTVNDb21wb25lbnRzKFxyXG4gICAgdGl0bGUsXHJcbiAgICBkYXRlLFxyXG4gICAgaWNvbixcclxuICAgIHRleHQsXHJcbiAgICB0ZW1wLFxyXG4gICAgZmVlbHNMaWtlLFxyXG4gICAgbWF4VGVtcCxcclxuICAgIG1pblRlbXAsXHJcbiAgICBjaGFuY2VSYWluLFxyXG4gICAgcHJlY2lwaXRhdGlvbixcclxuICAgIHdpbmRTcGVlZCxcclxuICAgIGh1bWlkaXR5LFxyXG4gICAgc3VucmlzZSxcclxuICAgIHN1bnNldFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9O1xyXG4iLCJsZXQgZGF0YUJhc2U7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXREYXRhKHZhbHVlKSB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgIGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWM1NWViZjg5NWRhODQ5Njk5MWYyMjIwNDIyMzE4MDkmcT0ke3ZhbHVlfSZkYXlzPTEwJmFxaT1ubyZhbGVydHM9bm9gXHJcbiAgKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICBkYXRhQmFzZSA9IGRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB7ZGF0YUJhc2UsIGdldERhdGF9IiwiaW1wb3J0IHsgZGF0YUJhc2UsIGdldERhdGEgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9IGZyb20gXCIuL2NyZWF0ZUFzQ29tcFwiO1xyXG5pbXBvcnQgeyByZW5kZXJGb290ZXJDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5pbXBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVNYWluU2VjdGlvblwiO1xyXG5pbXBvcnQgeyByZW5kZXJIZWFkZXIgfSBmcm9tIFwiLi9jcmVhdGVIZWFkZXJDb21wXCI7XHJcbmltcG9ydCB7IGdldERhdGVBcGkgfSBmcm9tIFwiLi9jbG9ja1wiO1xyXG5pbXBvcnQgeyBjaGFuZ2VTY2FsZSB9IGZyb20gXCIuL2NoYW5nZVNjYWxlXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkb1RoaW5ncyh2YWx1ZSkge1xyXG4gIGF3YWl0IGdldERhdGEodmFsdWUpO1xyXG4gIGNvbnNvbGUubG9nKGRhdGFCYXNlKTsgLy9kaXNwbGF5IHRoaW5ncyAtPiB3YWl0IGZvciBkYXRhXHJcbiAgZ2V0RGF0ZUFwaSgpO1xyXG4gIHJlbmRlckhlYWRlcigpO1xyXG4gIHJlbmRlck1TQ29tcG9uZW50cyhcIjBcIik7XHJcbiAgcmVuZGVyQXNpZGVDb21wb25lbnQoXCIwXCIpO1xyXG4gIHJlbmRlckZvb3RlckNvbXBvbmVudHMoKTtcclxuICBjaGFuZ2VTY2FsZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZWFyY2hPbkNsaWNrKCkge1xyXG4gIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIik7XHJcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5cIik7XHJcblxyXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgZG9UaGluZ3Moc2VhcmNoSW5wdXQudmFsdWUpO1xyXG4gICAgY2hhbmdlU2NhbGUoKTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHsgZG9UaGluZ3MsIHNlYXJjaE9uQ2xpY2sgfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyB1cGRhdGVNaWxpIH0gZnJvbSBcIi4vY2xvY2suanNcIjtcclxuaW1wb3J0IHtkb1RoaW5nc30gZnJvbSBcIi4vZG9tLmpzXCJcclxuaW1wb3J0IHsgc2VhcmNoT25DbGljayB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5cclxuZG9UaGluZ3MoXCJsb25kb25cIik7XHJcbnNlYXJjaE9uQ2xpY2soKTtcclxudXBkYXRlTWlsaSgpO1xyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9