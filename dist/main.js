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
  tglBtn.addEventListener("click", () => {
    if (farenheit) {
      farenheit = false;
      dot.classList.remove("dot-click");
      c.style.color = "#FFF";
      f.style.color = "gray";
    } else {
      farenheit = true;
      dot.classList.add("dot-click");
      c.style.color = "gray";
      f.style.color = "#FFF";
    }

    (0,_createMainSection__WEBPACK_IMPORTED_MODULE_0__.renderMSComponents)(_createFooComp__WEBPACK_IMPORTED_MODULE_2__.currentCompIndex);
    (0,_createAsComp__WEBPACK_IMPORTED_MODULE_1__.renderAsideComponent)(_createFooComp__WEBPACK_IMPORTED_MODULE_2__.currentCompIndex);
    (0,_createFooComp__WEBPACK_IMPORTED_MODULE_2__.renderFooterComponents)(_createFooComp__WEBPACK_IMPORTED_MODULE_2__.currentCompIndex);
  });
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

function renderFooterComponents(value) {
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

  initCurrent(value);
  currentCompIndex = value;
}

function clearFooterSection() {
  while (footerSection.firstChild) {
    footerSection.removeChild(footerSection.firstChild);
  }
}

function initCurrent(value) {
  const init = footerSection.childNodes[value];
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
  (0,_createFooComp__WEBPACK_IMPORTED_MODULE_2__.renderFooterComponents)("0");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDOEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuTTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0ZBQXdGLE1BQU07QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1YrQztBQUNPO0FBQ0c7QUFDQTtBQUNQO0FBQ2I7QUFDTztBQUM1QztBQUNBO0FBQ0EsUUFBUSxrREFBTztBQUNmLGNBQWMsK0NBQVEsR0FBRztBQUN6QixFQUFFLGtEQUFVO0FBQ1osRUFBRSwrREFBWTtBQUNkLEVBQUUsc0VBQWtCO0FBQ3BCLEVBQUUsbUVBQW9CO0FBQ3RCLEVBQUUsc0VBQXNCO0FBQ3hCLEVBQUUseURBQVc7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBVztBQUNmLEdBQUc7QUFDSDtBQUNBO0FBQ21DOzs7Ozs7O1VDN0JuQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ053QztBQUNQO0FBQ1E7QUFDekM7QUFDQSxpREFBUTtBQUNSLHNEQUFhO0FBQ2IscURBQVU7QUFDViIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY2hhbmdlU2NhbGUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jbG9jay5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUFzQ29tcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUZvb0NvbXAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVIZWFkZXJDb21wLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlTWFpblNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9kYXRhYmFzZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVNYWluU2VjdGlvblwiO1xyXG5pbXBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9IGZyb20gXCIuL2NyZWF0ZUFzQ29tcFwiO1xyXG5pbXBvcnQgeyByZW5kZXJGb290ZXJDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5pbXBvcnQgeyBjdXJyZW50Q29tcEluZGV4IH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5cclxubGV0IGZhcmVuaGVpdCA9IGZhbHNlO1xyXG5cclxuY29uc3QgdGdsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2dnbGUtYnRuXCIpO1xyXG5jb25zdCBkb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvdFwiKTtcclxuY29uc3QgYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY1wiKTtcclxuY29uc3QgZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZlwiKTtcclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVNjYWxlKCkge1xyXG4gIHRnbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgaWYgKGZhcmVuaGVpdCkge1xyXG4gICAgICBmYXJlbmhlaXQgPSBmYWxzZTtcclxuICAgICAgZG90LmNsYXNzTGlzdC5yZW1vdmUoXCJkb3QtY2xpY2tcIik7XHJcbiAgICAgIGMuc3R5bGUuY29sb3IgPSBcIiNGRkZcIjtcclxuICAgICAgZi5zdHlsZS5jb2xvciA9IFwiZ3JheVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmFyZW5oZWl0ID0gdHJ1ZTtcclxuICAgICAgZG90LmNsYXNzTGlzdC5hZGQoXCJkb3QtY2xpY2tcIik7XHJcbiAgICAgIGMuc3R5bGUuY29sb3IgPSBcImdyYXlcIjtcclxuICAgICAgZi5zdHlsZS5jb2xvciA9IFwiI0ZGRlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlck1TQ29tcG9uZW50cyhjdXJyZW50Q29tcEluZGV4KTtcclxuICAgIHJlbmRlckFzaWRlQ29tcG9uZW50KGN1cnJlbnRDb21wSW5kZXgpO1xyXG4gICAgcmVuZGVyRm9vdGVyQ29tcG9uZW50cyhjdXJyZW50Q29tcEluZGV4KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHsgZmFyZW5oZWl0LCBjaGFuZ2VTY2FsZSB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcblxyXG5jb25zdCBjbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvY2tcIik7XHJcbmxldCBtaWxpc2Vjb25kcztcclxuXHJcbmZ1bmN0aW9uIHNldENsb2NrKCkge1xyXG4gIGNvbnN0IGN1cnJlbnRUaW1lID0gbWlsaXNlY29uZHM7XHJcbiAgY29uc3QgZnVsbERhdGUgPSBuZXcgRGF0ZShjdXJyZW50VGltZSk7XHJcblxyXG4gIGxldCBoID0gZnVsbERhdGUuZ2V0SG91cnMoKTtcclxuICBsZXQgbSA9IGZ1bGxEYXRlLmdldE1pbnV0ZXMoKTtcclxuICBsZXQgcyA9IGZ1bGxEYXRlLmdldFNlY29uZHMoKTtcclxuXHJcbiAgaWYoaXNOYU4obWlsaXNlY29uZHMpIHx8IG1pbGlzZWNvbmRzID09PSB1bmRlZmluZWQpIHtcclxuICAgIGNsb2NrLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAoaCA8IDEwKSB7XHJcbiAgICBoID0gYDAke2h9YDtcclxuICB9XHJcbiAgaWYgKG0gPCAxMCkge1xyXG4gICAgbSA9IGAwJHttfWA7XHJcbiAgfVxyXG4gIGlmIChzIDwgMTApIHtcclxuICAgIHMgPSBgMCR7c31gO1xyXG4gIH1cclxuICBjbG9jay5pbm5lclRleHQgPSBgJHtofToke219OiR7c31gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlQXBpKCkge1xyXG4gIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIHtcclxuICAgIHRpbWVab25lOiBkYXRhQmFzZS5sb2NhdGlvbi50el9pZCxcclxuICAgIGhvdXJDeWNsZTogXCJoMjRcIixcclxuICAgIG1vbnRoOiBcIjItZGlnaXRcIixcclxuICAgIGRheTogXCIyLWRpZ2l0XCIsXHJcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxyXG4gICAgbWludXRlOiBcIjItZGlnaXRcIixcclxuICAgIHNlY29uZDogXCIyLWRpZ2l0XCIsXHJcbiAgICBob3VyMTI6IFwidHJ1ZVwiLFxyXG4gIH0pO1xyXG5cclxuICBtaWxpc2Vjb25kcyA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTWlsaSgpIHtcclxuICBzZXRDbG9jaygpO1xyXG4gIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIG1pbGlzZWNvbmRzICs9IDEwMDA7XHJcbiAgICB1cGRhdGVNaWxpKCk7XHJcbiAgICBzZXRDbG9jaygpO1xyXG4gIH0sIDEwMDApO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IGdldERhdGVBcGksIHVwZGF0ZU1pbGkgfTtcclxuIiwiaW1wb3J0IHsgZmFyZW5oZWl0IH0gZnJvbSBcIi4vY2hhbmdlU2NhbGVcIjtcclxuaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuY29uc3QgYXNpZGVTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hc2lkZS1zZWN0aW9uXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQXNDb21wKGhvdXIsIGljb24sIHRleHQsIHRlbXAsIGNoYW5jZVJhaW4pIHtcclxuICBjb25zdCBhc0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYXNDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImFzLWNvbXBcIik7XHJcblxyXG4gIGFzQ29tcG9uZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiYXMtY29tcC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWNsb2NrLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPHA+JHtob3VyfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXMtY29tcC1jb250XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtYWluLWljb25cIiBzcmM9XCIke2ljb259XCIgLz5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHt0ZXh0fTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj50ZW1wZXJhdHVyZTwvcD5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZW1wfTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gIGFzaWRlU2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgYXNDb21wb25lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJBc2lkZUNvbXBvbmVudChpbmRleCkge1xyXG4gIGNsZWFyQXNpZGVTZWN0aW9uKCk7XHJcbiAgY29uc3QgaG91cnMgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpbmRleF0uaG91cjtcclxuXHJcbiAgaG91cnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgaG91ciA9IGVsZW1lbnQudGltZS5zcGxpdChcIiBcIilbMV07XHJcbiAgICBjb25zdCBpY29uID0gYGh0dHBzOi8vJHtlbGVtZW50LmNvbmRpdGlvbi5pY29ufWA7XHJcbiAgICBjb25zdCB0ZXh0ID0gZWxlbWVudC5jb25kaXRpb24udGV4dDtcclxuICAgIGxldCB0ZW1wID0gYCR7ZWxlbWVudC50ZW1wX2N9wrBDYDtcclxuICAgIGNvbnN0IGNoYW5jZVJhaW4gPSBlbGVtZW50LmNoYW5jZV9vZl9yYWluO1xyXG5cclxuICAgIGlmIChmYXJlbmhlaXQpIHtcclxuICAgICAgdGVtcCA9IGAke2VsZW1lbnQudGVtcF9mfcKwRmA7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQXNDb21wKGhvdXIsIGljb24sIHRleHQsIHRlbXAsIGNoYW5jZVJhaW4pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckFzaWRlU2VjdGlvbigpIHtcclxuICB3aGlsZSAoYXNpZGVTZWN0aW9uLmZpcnN0Q2hpbGQpIHtcclxuICAgIGFzaWRlU2VjdGlvbi5yZW1vdmVDaGlsZChhc2lkZVNlY3Rpb24uZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZU1haW5TZWN0aW9uXCI7XHJcbmltcG9ydCB7IHJlbmRlckFzaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4vY3JlYXRlQXNDb21wXCI7XHJcbmltcG9ydCB7IGZhcmVuaGVpdCB9IGZyb20gXCIuL2NoYW5nZVNjYWxlXCI7XHJcblxyXG5jb25zdCBmb290ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXItc2VjdGlvblwiKTtcclxubGV0IGN1cnJlbnRDb21wSW5kZXggPSBcIjBcIlxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRm9vdGVyQ29tcG9uZW50KGRheSwgZGF0ZSwgaWNvbiwgdGVtcCwgY2hhbmNlUmFpbiwgaWQpIHtcclxuICBjb25zdCBmb290ZXJDb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGZvb3RlckNvbXBvbmVudC5jbGFzc0xpc3QuYWRkKFwiZm9vLWNvbXBcIik7XHJcbiAgZm9vdGVyQ29tcG9uZW50LnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgYCR7aWR9YCk7XHJcblxyXG4gIGZvb3RlckNvbXBvbmVudC5pbm5lckhUTUwgPSBgPGRpdj5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtkYXl9PC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbFwiPiR7ZGF0ZX08L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8aW1nIGNsYXNzPVwibWFpbi1pY29uXCIgc3JjPVwiJHtpY29ufVwiIC8+XHJcblxyXG4gXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+dGVtcGVyYXR1cmU8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7dGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtcmFpbi01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmNoYW5jZSBvZiByYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke2NoYW5jZVJhaW59JTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuXHJcbiAgZm9vdGVyU2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgZm9vdGVyQ29tcG9uZW50KTtcclxuXHJcbiAgZm9vdGVyQ29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBpbmRleCA9IGZvb3RlckNvbXBvbmVudC5kYXRhc2V0LmlkO1xyXG4gICAgc2V0Q3VycmVudENvbXAoKTtcclxuICAgIHJlbmRlck1TQ29tcG9uZW50cyhpbmRleCk7XHJcbiAgICByZW5kZXJBc2lkZUNvbXBvbmVudChpbmRleCk7XHJcbiAgICBjdXJyZW50Q29tcEluZGV4ID0gaW5kZXg7XHJcbiAgfSk7XHJcblxyXG4gIGZ1bmN0aW9uIHNldEN1cnJlbnRDb21wKCkge1xyXG4gICAgZm9vdGVyU2VjdGlvbi5jaGlsZE5vZGVzLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgIGNoaWxkLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgY2hpbGQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG4gICAgfSk7XHJcbiAgICBmb290ZXJDb21wb25lbnQuc3R5bGUub3BhY2l0eSA9IFwiMC42XCI7XHJcbiAgICBmb290ZXJDb21wb25lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyRm9vdGVyQ29tcG9uZW50cyh2YWx1ZSkge1xyXG4gIGNsZWFyRm9vdGVyU2VjdGlvbigpO1xyXG5cclxuICBjb25zdCBkYXlzID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXk7XHJcbiAgZGF5cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgZGF5ID0gZ2V0RGF5KGVsZW1lbnQuZGF0ZSk7XHJcbiAgICBjb25zdCBkYXRlID0gZ2V0RGF0ZShlbGVtZW50LmRhdGUpO1xyXG4gICAgY29uc3QgaWNvbiA9IGBodHRwczovLyR7ZWxlbWVudC5kYXkuY29uZGl0aW9uLmljb259YDtcclxuICAgIGxldCB0ZW1wID0gYCR7ZWxlbWVudC5kYXkuYXZndGVtcF9jfcKwQ2A7XHJcbiAgICBjb25zdCBjaGFuY2VSYWluID0gZWxlbWVudC5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW47XHJcblxyXG4gICAgaWYgKGZhcmVuaGVpdCkge1xyXG4gICAgICB0ZW1wID0gYCR7ZWxlbWVudC5kYXkuYXZndGVtcF9mfcKwRmA7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRm9vdGVyQ29tcG9uZW50KGRheSwgZGF0ZSwgaWNvbiwgdGVtcCwgY2hhbmNlUmFpbiwgaW5kZXgpO1xyXG4gIH0pO1xyXG5cclxuICBpbml0Q3VycmVudCh2YWx1ZSk7XHJcbiAgY3VycmVudENvbXBJbmRleCA9IHZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckZvb3RlclNlY3Rpb24oKSB7XHJcbiAgd2hpbGUgKGZvb3RlclNlY3Rpb24uZmlyc3RDaGlsZCkge1xyXG4gICAgZm9vdGVyU2VjdGlvbi5yZW1vdmVDaGlsZChmb290ZXJTZWN0aW9uLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEN1cnJlbnQodmFsdWUpIHtcclxuICBjb25zdCBpbml0ID0gZm9vdGVyU2VjdGlvbi5jaGlsZE5vZGVzW3ZhbHVlXTtcclxuICBpbml0LnN0eWxlLm9wYWNpdHkgPSBcIjAuNlwiO1xyXG4gIGluaXQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlKGRhdGUpIHtcclxuICBjb25zdCBmdWxsRGF0ZSA9IGRhdGUuc3BsaXQoXCItXCIpO1xyXG5cclxuICBjb25zdCBkYXkgPSBmdWxsRGF0ZVsyXTtcclxuICBjb25zdCBtb250aCA9IGZ1bGxEYXRlWzFdO1xyXG4gIGNvbnN0IHllYXIgPSBmdWxsRGF0ZVswXTtcclxuXHJcbiAgcmV0dXJuIGAke21vbnRofS8ke2RheX0vJHt5ZWFyfWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERheShkYXRlKSB7XHJcbiAgY29uc3Qgd2VlayA9IFtcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiLCBcIlN1blwiXTtcclxuICBjb25zdCB3ZWVrRGF5ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KCk7XHJcbiAgY29uc3QgZGF5ID0gd2Vla1t3ZWVrRGF5XTtcclxuXHJcbiAgcmV0dXJuIGRheTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVuZGVyRm9vdGVyQ29tcG9uZW50cywgZ2V0RGF0ZSwgY3VycmVudENvbXBJbmRleCwgaW5pdEN1cnJlbnQgfTtcclxuIiwiaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCIuL2NyZWF0ZUZvb0NvbXBcIjtcclxuaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuZnVuY3Rpb24gc2V0SGVhZGVySW5mbyhuYW1lLCBzdWJ0LCBkYXRlKSB7XHJcbiAgY29uc3QgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50LWNpdHlcIik7XHJcbiAgY29uc3Qgc3VidFR0bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaW9uLWNvdW50cnlcIik7XHJcbiAgY29uc3QgY3VycmVudERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnQtZGF0ZVwiKTtcclxuXHJcbiAgbWFpblRpdGxlLmlubmVyVGV4dCA9IG5hbWU7XHJcbiAgc3VidFR0bC5pbm5lclRleHQgPSBzdWJ0O1xyXG4gIGN1cnJlbnREYXRlLmlubmVyVGV4dCA9IGRhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNwbGl0RGF0ZShkYXRlKSB7XHJcbiAgICBjb25zdCBhckRhdGUgPSBkYXRlLnNwbGl0KFwiIFwiKTtcclxuXHJcbiAgICByZXR1cm4gYXJEYXRlWzBdO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJIZWFkZXIoKSB7XHJcbiAgY29uc3QgbmFtZSA9IGRhdGFCYXNlLmxvY2F0aW9uLm5hbWU7XHJcbiAgY29uc3Qgc3VidCA9IGAke2RhdGFCYXNlLmxvY2F0aW9uLnJlZ2lvbn0gLSAke2RhdGFCYXNlLmxvY2F0aW9uLmNvdW50cnl9YDtcclxuICBjb25zdCBkYXRlID0gZ2V0RGF0ZShzcGxpdERhdGUoZGF0YUJhc2UubG9jYXRpb24ubG9jYWx0aW1lKSk7XHJcblxyXG4gIHNldEhlYWRlckluZm8obmFtZSwgc3VidCwgZGF0ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlckhlYWRlciB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IGZhcmVuaGVpdCB9IGZyb20gXCIuL2NoYW5nZVNjYWxlXCI7XHJcblxyXG5jb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlTVNDb21wb25lbnRzKFxyXG4gIHRpdGxlLFxyXG4gIGRhdGUsXHJcbiAgaWNvbixcclxuICB0ZXh0LFxyXG4gIHRlbXAsXHJcbiAgZmVlbHNMaWtlLFxyXG4gIG1heFRlbXAsXHJcbiAgbWluVGVtcCxcclxuICBjaGFuY2VSYWluLFxyXG4gIHByZWNpcGl0YXRpb24sXHJcbiAgd2luZFNwZWVkLFxyXG4gIGh1bWlkaXR5LFxyXG4gIHN1bnJpc2UsXHJcbiAgc3Vuc2V0XHJcbikge1xyXG4gIG1haW5TZWN0aW9uLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwid3ItaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGgxIGNsYXNzPVwibWFpbi1zdWJ0XCI+JHt0aXRsZX08L2gxPlxyXG4gICAgICAgICAgICAgIDxwPiR7ZGF0ZX08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibWFpbi1pY29uXCIgc3JjPVwiJHtpY29ufVwiIC8+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3RleHR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ci1jb250ZW50XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+dGVtcGVyYXR1cmU8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3RlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+ZmVlbHMgbGlrZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7ZmVlbHNMaWtlfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci11cC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPm1heDwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7bWF4VGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLWRvd24tNTAucG5nXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPm1pbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7bWluVGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtcmFpbi01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmNoYW5jZSBvZiByYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtjaGFuY2VSYWlufSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtaHlncm9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnByZWNpcGl0YXRpb248L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3ByZWNpcGl0YXRpb259PHNwYW4gY2xhc3M9XCJfc21hbGxcIj5tbTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtd2luZC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPndpbmQgc3BlZWQ8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3dpbmRTcGVlZH08c3BhbiBjbGFzcz1cIl9zbWFsbFwiPmttL2g8L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWRyb3AtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5odW1pZGl0eTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7aHVtaWRpdHl9JTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1zdW5yaXNlLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+c3VucmlzZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHtzdW5yaXNlfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1zdW5zZXQtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5zdW5zZXQ8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7c3Vuc2V0fTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXkoZGF0ZSkge1xyXG4gIGNvbnN0IHdlZWsgPSBbXHJcbiAgICBcIk1vbmRheVwiLFxyXG4gICAgXCJUdWVzZGF5XCIsXHJcbiAgICBcIldlZG5lc2RheVwiLFxyXG4gICAgXCJUaHVyc2RheVwiLFxyXG4gICAgXCJGcmlkYXlcIixcclxuICAgIFwiU2F0dXJkYXlcIixcclxuICAgIFwiU3VuZGF5XCIsXHJcbiAgXTtcclxuICBjb25zdCB3ZWVrRGF5ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KCk7XHJcbiAgY29uc3QgZGF5ID0gd2Vla1t3ZWVrRGF5XTtcclxuXHJcbiAgcmV0dXJuIGRheTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0SG91cihob3VyKSB7XHJcbiAgY29uc3QgYXJIb3VyID0gaG91ci5zcGxpdChcIiBcIik7XHJcbiAgcmV0dXJuIGAke2FySG91clswXX08c3BhbiBjbGFzcz1cIl9zbWFsbFwiPiR7YXJIb3VyWzFdfTwvc3Bhbj5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJNU0NvbXBvbmVudHMoaW5kZXgpIHtcclxuICBjb25zdCB0YXJnZXQgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpbmRleF07XHJcbiAgY29uc3QgdGl0bGUgPSBnZXREYXkodGFyZ2V0LmRhdGUpO1xyXG4gIGNvbnN0IGRhdGUgPSBnZXREYXRlKHRhcmdldC5kYXRlKTtcclxuICBjb25zdCBpY29uID0gYGh0dHBzOi8vJHt0YXJnZXQuZGF5LmNvbmRpdGlvbi5pY29ufWA7XHJcbiAgY29uc3QgdGV4dCA9IHRhcmdldC5kYXkuY29uZGl0aW9uLnRleHQ7XHJcblxyXG4gIGxldCB0ZW1wID0gYCR7dGFyZ2V0LmRheS5hdmd0ZW1wX2N9wrBDYDsgO1xyXG4gIGxldCBmZWVsc0xpa2UgPSBcIi0vLVwiO1xyXG4gIGxldCBtYXhUZW1wID0gYCR7dGFyZ2V0LmRheS5tYXh0ZW1wX2N9wrBDYDtcclxuICBsZXQgbWluVGVtcCA9IGAke3RhcmdldC5kYXkubWludGVtcF9jfcKwQ2A7XHJcblxyXG4gIGNvbnN0IGNoYW5jZVJhaW4gPSB0YXJnZXQuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb24gPSB0YXJnZXQuZGF5LnRvdGFscHJlY2lwX21tO1xyXG4gIGxldCB3aW5kU3BlZWQgPSBcIi0vLVwiO1xyXG4gIGNvbnN0IGh1bWlkaXR5ID0gdGFyZ2V0LmRheS5hdmdodW1pZGl0eTtcclxuXHJcbiAgY29uc3Qgc3VucmlzZSA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnJpc2UpO1xyXG4gIGNvbnN0IHN1bnNldCA9IHNldEhvdXIodGFyZ2V0LmFzdHJvLnN1bnNldCk7XHJcblxyXG4gIGlmIChmYXJlbmhlaXQpIHtcclxuICAgIHRlbXAgPSBgJHt0YXJnZXQuZGF5LmF2Z3RlbXBfZn3CsEZgO1xyXG4gICAgbWF4VGVtcCA9IGAke3RhcmdldC5kYXkubWF4dGVtcF9mfcKwRmA7XHJcbiAgICBtaW5UZW1wID0gYCR7dGFyZ2V0LmRheS5taW50ZW1wX2Z9wrBGYDtcclxuICB9XHJcblxyXG4gIGlmIChpbmRleCA9PT0gXCIwXCIpIHtcclxuICAgIHdpbmRTcGVlZCA9IGRhdGFCYXNlLmN1cnJlbnQud2luZF9rcGg7XHJcbiAgICBpZiAoZmFyZW5oZWl0KSB7XHJcbiAgICAgIHRlbXAgPSBgJHtkYXRhQmFzZS5jdXJyZW50LnRlbXBfZn3CsEZgO1xyXG4gICAgICBmZWVsc0xpa2UgPWAke2RhdGFCYXNlLmN1cnJlbnQuZmVlbHNsaWtlX2Z9wrBGYCA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZW1wID0gYCR7ZGF0YUJhc2UuY3VycmVudC50ZW1wX2N9wrBDYDtcclxuICAgICAgZmVlbHNMaWtlID0gYCR7ZGF0YUJhc2UuY3VycmVudC5mZWVsc2xpa2VfY33CsENgO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlTVNDb21wb25lbnRzKFxyXG4gICAgdGl0bGUsXHJcbiAgICBkYXRlLFxyXG4gICAgaWNvbixcclxuICAgIHRleHQsXHJcbiAgICB0ZW1wLFxyXG4gICAgZmVlbHNMaWtlLFxyXG4gICAgbWF4VGVtcCxcclxuICAgIG1pblRlbXAsXHJcbiAgICBjaGFuY2VSYWluLFxyXG4gICAgcHJlY2lwaXRhdGlvbixcclxuICAgIHdpbmRTcGVlZCxcclxuICAgIGh1bWlkaXR5LFxyXG4gICAgc3VucmlzZSxcclxuICAgIHN1bnNldFxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9O1xyXG4iLCJsZXQgZGF0YUJhc2U7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXREYXRhKHZhbHVlKSB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgIGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PWM1NWViZjg5NWRhODQ5Njk5MWYyMjIwNDIyMzE4MDkmcT0ke3ZhbHVlfSZkYXlzPTEwJmFxaT1ubyZhbGVydHM9bm9gXHJcbiAgKTtcclxuICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICBkYXRhQmFzZSA9IGRhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB7ZGF0YUJhc2UsIGdldERhdGF9IiwiaW1wb3J0IHsgZGF0YUJhc2UsIGdldERhdGEgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5pbXBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9IGZyb20gXCIuL2NyZWF0ZUFzQ29tcFwiO1xyXG5pbXBvcnQgeyByZW5kZXJGb290ZXJDb21wb25lbnRzIH0gZnJvbSBcIi4vY3JlYXRlRm9vQ29tcFwiO1xyXG5pbXBvcnQgeyByZW5kZXJNU0NvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVNYWluU2VjdGlvblwiO1xyXG5pbXBvcnQgeyByZW5kZXJIZWFkZXIgfSBmcm9tIFwiLi9jcmVhdGVIZWFkZXJDb21wXCI7XHJcbmltcG9ydCB7IGdldERhdGVBcGkgfSBmcm9tIFwiLi9jbG9ja1wiO1xyXG5pbXBvcnQgeyBjaGFuZ2VTY2FsZSB9IGZyb20gXCIuL2NoYW5nZVNjYWxlXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkb1RoaW5ncyh2YWx1ZSkge1xyXG4gIGF3YWl0IGdldERhdGEodmFsdWUpO1xyXG4gIGNvbnNvbGUubG9nKGRhdGFCYXNlKTsgLy9kaXNwbGF5IHRoaW5ncyAtPiB3YWl0IGZvciBkYXRhXHJcbiAgZ2V0RGF0ZUFwaSgpO1xyXG4gIHJlbmRlckhlYWRlcigpO1xyXG4gIHJlbmRlck1TQ29tcG9uZW50cyhcIjBcIik7XHJcbiAgcmVuZGVyQXNpZGVDb21wb25lbnQoXCIwXCIpO1xyXG4gIHJlbmRlckZvb3RlckNvbXBvbmVudHMoXCIwXCIpO1xyXG4gIGNoYW5nZVNjYWxlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlYXJjaE9uQ2xpY2soKSB7XHJcbiAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKTtcclxuICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0blwiKTtcclxuXHJcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBkb1RoaW5ncyhzZWFyY2hJbnB1dC52YWx1ZSk7XHJcbiAgICBjaGFuZ2VTY2FsZSgpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgeyBkb1RoaW5ncywgc2VhcmNoT25DbGljayB9O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHVwZGF0ZU1pbGkgfSBmcm9tIFwiLi9jbG9jay5qc1wiO1xyXG5pbXBvcnQge2RvVGhpbmdzfSBmcm9tIFwiLi9kb20uanNcIlxyXG5pbXBvcnQgeyBzZWFyY2hPbkNsaWNrIH0gZnJvbSBcIi4vZG9tLmpzXCI7XHJcblxyXG5kb1RoaW5ncyhcImxvbmRvblwiKTtcclxuc2VhcmNoT25DbGljaygpO1xyXG51cGRhdGVNaWxpKCk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=