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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Yy9jbG9jay5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUFzQ29tcC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2NyZWF0ZUZvb0NvbXAuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9jcmVhdGVIZWFkZXJDb21wLmpzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3QvLi9zcmMvY3JlYXRlTWFpblNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9kYXRhYmFzZS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXJfYXBwX3Byb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyX2FwcF9wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlcl9hcHBfcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcblxyXG5jb25zdCBjbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2xvY2tcIik7XHJcbmxldCBtaWxpc2Vjb25kcztcclxuXHJcbmZ1bmN0aW9uIHNldENsb2NrKCkge1xyXG4gIGNvbnN0IGN1cnJlbnRUaW1lID0gbWlsaXNlY29uZHM7XHJcbiAgY29uc3QgZnVsbERhdGUgPSBuZXcgRGF0ZShjdXJyZW50VGltZSk7XHJcblxyXG4gIGxldCBoID0gZnVsbERhdGUuZ2V0SG91cnMoKTtcclxuICBsZXQgbSA9IGZ1bGxEYXRlLmdldE1pbnV0ZXMoKTtcclxuICBsZXQgcyA9IGZ1bGxEYXRlLmdldFNlY29uZHMoKTtcclxuXHJcbiAgaWYoaXNOYU4obWlsaXNlY29uZHMpIHx8IG1pbGlzZWNvbmRzID09PSB1bmRlZmluZWQpIHtcclxuICAgIGNsb2NrLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAoaCA8IDEwKSB7XHJcbiAgICBoID0gYDAke2h9YDtcclxuICB9XHJcbiAgaWYgKG0gPCAxMCkge1xyXG4gICAgbSA9IGAwJHttfWA7XHJcbiAgfVxyXG4gIGlmIChzIDwgMTApIHtcclxuICAgIHMgPSBgMCR7c31gO1xyXG4gIH1cclxuICBjbG9jay5pbm5lclRleHQgPSBgJHtofToke219OiR7c31gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlQXBpKCkge1xyXG4gIGxldCBkYXRlID0gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZyhcImVuLVVTXCIsIHtcclxuICAgIHRpbWVab25lOiBkYXRhQmFzZS5sb2NhdGlvbi50el9pZCxcclxuICAgIGhvdXJDeWNsZTogXCJoMjRcIixcclxuICAgIG1vbnRoOiBcIjItZGlnaXRcIixcclxuICAgIGRheTogXCIyLWRpZ2l0XCIsXHJcbiAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIGhvdXI6IFwiMi1kaWdpdFwiLFxyXG4gICAgbWludXRlOiBcIjItZGlnaXRcIixcclxuICAgIHNlY29uZDogXCIyLWRpZ2l0XCIsXHJcbiAgICBob3VyMTI6IFwidHJ1ZVwiLFxyXG4gIH0pO1xyXG5cclxuICBtaWxpc2Vjb25kcyA9IG5ldyBEYXRlKGRhdGUpLmdldFRpbWUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTWlsaSgpIHtcclxuICBzZXRDbG9jaygpO1xyXG4gIGNvbnN0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIG1pbGlzZWNvbmRzICs9IDEwMDA7XHJcbiAgICB1cGRhdGVNaWxpKCk7XHJcbiAgICBzZXRDbG9jaygpO1xyXG4gIH0sIDEwMDApO1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IGdldERhdGVBcGksIHVwZGF0ZU1pbGkgfTtcclxuIiwiaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuY29uc3QgYXNpZGVTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hc2lkZS1zZWN0aW9uXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQXNDb21wKGhvdXIsIGljb24sIHRleHQsIHRlbXAsIGNoYW5jZVJhaW4pIHtcclxuICBjb25zdCBhc0NvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYXNDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImFzLWNvbXBcIik7XHJcblxyXG4gIGFzQ29tcG9uZW50LmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiYXMtY29tcC1oZWFkZXJcIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWNsb2NrLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPHA+JHtob3VyfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXMtY29tcC1jb250XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtYWluLWljb25cIiBzcmM9XCIke2ljb259XCIgLz5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHt0ZXh0fTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj50ZW1wZXJhdHVyZTwvcD5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHt0ZW1wfcKwQzwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+Y2hhbmNlIG9mIHJhaW48L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7Y2hhbmNlUmFpbn0lPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gIGFzaWRlU2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgYXNDb21wb25lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJBc2lkZUNvbXBvbmVudChpbmRleCkge1xyXG4gIGNsZWFyQXNpZGVTZWN0aW9uKCk7XHJcbiAgY29uc3QgaG91cnMgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpbmRleF0uaG91cjtcclxuXHJcbiAgaG91cnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgY29uc3QgaG91ciA9IGVsZW1lbnQudGltZS5zcGxpdChcIiBcIilbMV07XHJcbiAgICBjb25zdCBpY29uID0gZWxlbWVudC5jb25kaXRpb24uaWNvbjtcclxuICAgIGNvbnN0IHRleHQgPSBlbGVtZW50LmNvbmRpdGlvbi50ZXh0O1xyXG4gICAgY29uc3QgdGVtcCA9IGVsZW1lbnQudGVtcF9jO1xyXG4gICAgY29uc3QgY2hhbmNlUmFpbiA9IGVsZW1lbnQuY2hhbmNlX29mX3JhaW47XHJcblxyXG4gICAgY3JlYXRlQXNDb21wKGhvdXIsIGljb24sIHRleHQsIHRlbXAsIGNoYW5jZVJhaW4pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjbGVhckFzaWRlU2VjdGlvbigpIHtcclxuICB3aGlsZSAoYXNpZGVTZWN0aW9uLmZpcnN0Q2hpbGQpIHtcclxuICAgIGFzaWRlU2VjdGlvbi5yZW1vdmVDaGlsZChhc2lkZVNlY3Rpb24uZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyByZW5kZXJBc2lkZUNvbXBvbmVudCB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZU1haW5TZWN0aW9uXCI7XHJcbmltcG9ydCB7IHJlbmRlckFzaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4vY3JlYXRlQXNDb21wXCI7XHJcblxyXG5jb25zdCBmb290ZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXItc2VjdGlvblwiKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUZvb3RlckNvbXBvbmVudChkYXksIGRhdGUsIGljb24sIHRlbXAsIGNoYW5jZVJhaW4sIGlkKSB7XHJcbiAgY29uc3QgZm9vdGVyQ29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBmb290ZXJDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImZvby1jb21wXCIpO1xyXG4gIGZvb3RlckNvbXBvbmVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIsIGAke2lkfWApO1xyXG5cclxuICBmb290ZXJDb21wb25lbnQuaW5uZXJIVE1MID0gYDxkaXY+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7ZGF5fTwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGxcIj4ke2RhdGV9PC9wPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGltZyBjbGFzcz1cIm1haW4taWNvblwiIHNyYz1cIiR7aWNvbn1cIiAvPlxyXG5cclxuIFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnRlbXBlcmF0dXJlPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3RlbXB9wrBDPC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXJhaW4tNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5jaGFuY2Ugb2YgcmFpbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHtjaGFuY2VSYWlufSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcblxyXG4gIGZvb3RlclNlY3Rpb24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGZvb3RlckNvbXBvbmVudCk7XHJcblxyXG4gIGZvb3RlckNvbXBvbmVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgaW5kZXggPSBmb290ZXJDb21wb25lbnQuZGF0YXNldC5pZDtcclxuICAgIHNldEN1cnJlbnRDb21wKCk7XHJcbiAgICByZW5kZXJNU0NvbXBvbmVudHMoaW5kZXgpO1xyXG4gICAgcmVuZGVyQXNpZGVDb21wb25lbnQoaW5kZXgpO1xyXG4gICAgY29uc29sZS5sb2coZm9vdGVyU2VjdGlvbi5jaGlsZE5vZGVzKTtcclxuICB9KTtcclxuXHJcbiAgZnVuY3Rpb24gc2V0Q3VycmVudENvbXAoKSB7XHJcbiAgICBmb290ZXJTZWN0aW9uLmNoaWxkTm9kZXMuZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgY2hpbGQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgICBjaGlsZC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbiAgICB9KTtcclxuICAgIGZvb3RlckNvbXBvbmVudC5zdHlsZS5vcGFjaXR5ID0gXCIwLjZcIjtcclxuICAgIGZvb3RlckNvbXBvbmVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJGb290ZXJDb21wb25lbnRzKCkge1xyXG4gIGNsZWFyRm9vdGVyU2VjdGlvbigpO1xyXG5cclxuICBjb25zdCBkYXlzID0gZGF0YUJhc2UuZm9yZWNhc3QuZm9yZWNhc3RkYXk7XHJcbiAgZGF5cy5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xyXG4gICAgY29uc3QgZGF5ID0gZ2V0RGF5KGVsZW1lbnQuZGF0ZSk7XHJcbiAgICBjb25zdCBkYXRlID0gZ2V0RGF0ZShlbGVtZW50LmRhdGUpO1xyXG4gICAgY29uc3QgaWNvbiA9IGVsZW1lbnQuZGF5LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgY29uc3QgdGVtcCA9IGVsZW1lbnQuZGF5LmF2Z3RlbXBfYztcclxuICAgIGNvbnN0IGNoYW5jZVJhaW4gPSBlbGVtZW50LmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbjtcclxuXHJcbiAgICBjcmVhdGVGb290ZXJDb21wb25lbnQoZGF5LCBkYXRlLCBpY29uLCB0ZW1wLCBjaGFuY2VSYWluLCBpbmRleCk7XHJcbiAgfSk7XHJcbiAgXHJcbiAgaW5pdEN1cnJlbnQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xlYXJGb290ZXJTZWN0aW9uKCkge1xyXG4gIHdoaWxlIChmb290ZXJTZWN0aW9uLmZpcnN0Q2hpbGQpIHtcclxuICAgIGZvb3RlclNlY3Rpb24ucmVtb3ZlQ2hpbGQoZm9vdGVyU2VjdGlvbi5maXJzdENoaWxkKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRDdXJyZW50KCkge1xyXG4gIGNvbnN0IGluaXQgPSBmb290ZXJTZWN0aW9uLmNoaWxkTm9kZXNbMF07XHJcbiAgaW5pdC5zdHlsZS5vcGFjaXR5ID0gXCIwLjZcIjtcclxuICBpbml0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGF0ZShkYXRlKSB7XHJcbiAgY29uc3QgZnVsbERhdGUgPSBkYXRlLnNwbGl0KFwiLVwiKTtcclxuXHJcbiAgY29uc3QgZGF5ID0gZnVsbERhdGVbMl07XHJcbiAgY29uc3QgbW9udGggPSBmdWxsRGF0ZVsxXTtcclxuICBjb25zdCB5ZWFyID0gZnVsbERhdGVbMF07XHJcblxyXG4gIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXkoZGF0ZSkge1xyXG4gIGNvbnN0IHdlZWsgPSBbXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIiwgXCJTdW5cIl07XHJcbiAgY29uc3Qgd2Vla0RheSA9IG5ldyBEYXRlKGRhdGUpLmdldERheSgpO1xyXG4gIGNvbnN0IGRheSA9IHdlZWtbd2Vla0RheV07XHJcblxyXG4gIHJldHVybiBkYXk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlckZvb3RlckNvbXBvbmVudHMsIGdldERhdGUgfTtcclxuIiwiaW1wb3J0IHsgZ2V0RGF0ZSB9IGZyb20gXCIuL2NyZWF0ZUZvb0NvbXBcIjtcclxuaW1wb3J0IHsgZGF0YUJhc2UgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xyXG5cclxuZnVuY3Rpb24gc2V0SGVhZGVySW5mbyhuYW1lLCBzdWJ0LCBkYXRlKSB7XHJcbiAgY29uc3QgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50LWNpdHlcIik7XHJcbiAgY29uc3Qgc3VidFR0bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaW9uLWNvdW50cnlcIik7XHJcbiAgY29uc3QgY3VycmVudERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2N1cnJlbnQtZGF0ZVwiKTtcclxuXHJcbiAgbWFpblRpdGxlLmlubmVyVGV4dCA9IG5hbWU7XHJcbiAgc3VidFR0bC5pbm5lclRleHQgPSBzdWJ0O1xyXG4gIGN1cnJlbnREYXRlLmlubmVyVGV4dCA9IGRhdGU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNwbGl0RGF0ZShkYXRlKSB7XHJcbiAgICBjb25zdCBhckRhdGUgPSBkYXRlLnNwbGl0KFwiIFwiKTtcclxuXHJcbiAgICByZXR1cm4gYXJEYXRlWzBdO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJIZWFkZXIoKSB7XHJcbiAgY29uc3QgbmFtZSA9IGRhdGFCYXNlLmxvY2F0aW9uLm5hbWU7XHJcbiAgY29uc3Qgc3VidCA9IGAke2RhdGFCYXNlLmxvY2F0aW9uLnJlZ2lvbn0gLSAke2RhdGFCYXNlLmxvY2F0aW9uLmNvdW50cnl9YDtcclxuICBjb25zdCBkYXRlID0gZ2V0RGF0ZShzcGxpdERhdGUoZGF0YUJhc2UubG9jYXRpb24ubG9jYWx0aW1lKSk7XHJcblxyXG4gIHNldEhlYWRlckluZm8obmFtZSwgc3VidCwgZGF0ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJlbmRlckhlYWRlciB9O1xyXG4iLCJpbXBvcnQgeyBkYXRhQmFzZSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IGdldERhdGUgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcblxyXG5jb25zdCBtYWluU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1zZWN0aW9uXCIpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlTVNDb21wb25lbnRzKFxyXG4gIHRpdGxlLFxyXG4gIGRhdGUsXHJcbiAgaWNvbixcclxuICB0ZXh0LFxyXG4gIHRlbXAsXHJcbiAgZmVlbHNMaWtlLFxyXG4gIG1heFRlbXAsXHJcbiAgbWluVGVtcCxcclxuICBjaGFuY2VSYWluLFxyXG4gIHByZWNpcGl0YXRpb24sXHJcbiAgd2luZFNwZWVkLFxyXG4gIGh1bWlkaXR5LFxyXG4gIHN1bnJpc2UsXHJcbiAgc3Vuc2V0XHJcbikge1xyXG4gIG1haW5TZWN0aW9uLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwid3ItaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPGgxIGNsYXNzPVwibWFpbi1zdWJ0XCI+JHt0aXRsZX08L2gxPlxyXG4gICAgICAgICAgICAgIDxwPiR7ZGF0ZX08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibWFpbi1pY29uXCIgc3JjPVwiJHtpY29ufVwiIC8+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtLTFcIj4ke3RleHR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3ci1jb250ZW50XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+dGVtcGVyYXR1cmU8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3RlbXB9PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+ZmVlbHMgbGlrZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7ZmVlbHNMaWtlfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC10aGVybW9tZXRlci11cC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPm1heDwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7bWF4VGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LXRoZXJtb21ldGVyLWRvd24tNTAucG5nXCJcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPm1pbjwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7bWluVGVtcH08L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtcmFpbi01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPmNoYW5jZSBvZiByYWluPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfbWVkaXVtXCI+JHtjaGFuY2VSYWlufSU8L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtaHlncm9tZXRlci01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPnByZWNpcGl0YXRpb248L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3ByZWNpcGl0YXRpb259PHNwYW4gY2xhc3M9XCJfc21hbGxcIj5tbTwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndyYXAtaWNvblwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9hc3NldHMvd2VhdGhlcl9pY29ucy9pY29uczgtd2luZC01MC5wbmdcIiAvPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250LWljb25cIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX3NtYWxsIF9hbEVuZFwiPndpbmQgc3BlZWQ8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW1cIj4ke3dpbmRTcGVlZH08c3BhbiBjbGFzcz1cIl9zbWFsbFwiPmttL2g8L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3cmFwLWljb25cIj5cclxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vYXNzZXRzL3dlYXRoZXJfaWNvbnMvaWNvbnM4LWRyb3AtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5odW1pZGl0eTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bVwiPiR7aHVtaWRpdHl9JTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1zdW5yaXNlLTUwLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnQtaWNvblwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJfc21hbGwgX2FsRW5kXCI+c3VucmlzZTwvcD5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiX21lZGl1bS0xXCI+JHtzdW5yaXNlfTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwid3JhcC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2Fzc2V0cy93ZWF0aGVyX2ljb25zL2ljb25zOC1zdW5zZXQtNTAucG5nXCIgLz5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udC1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9zbWFsbCBfYWxFbmRcIj5zdW5zZXQ8L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIl9tZWRpdW0tMVwiPiR7c3Vuc2V0fTwvcD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXREYXkoZGF0ZSkge1xyXG4gIGNvbnN0IHdlZWsgPSBbXHJcbiAgICBcIk1vbmRheVwiLFxyXG4gICAgXCJUdWVzZGF5XCIsXHJcbiAgICBcIldlZG5lc2RheVwiLFxyXG4gICAgXCJUaHVyc2RheVwiLFxyXG4gICAgXCJGcmlkYXlcIixcclxuICAgIFwiU2F0dXJkYXlcIixcclxuICAgIFwiU3VuZGF5XCIsXHJcbiAgXTtcclxuICBjb25zdCB3ZWVrRGF5ID0gbmV3IERhdGUoZGF0ZSkuZ2V0RGF5KCk7XHJcbiAgY29uc3QgZGF5ID0gd2Vla1t3ZWVrRGF5XTtcclxuXHJcbiAgcmV0dXJuIGRheTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0SG91cihob3VyKSB7XHJcbiAgY29uc3QgYXJIb3VyID0gaG91ci5zcGxpdChcIiBcIik7XHJcbiAgcmV0dXJuIGAke2FySG91clswXX08c3BhbiBjbGFzcz1cIl9zbWFsbFwiPiR7YXJIb3VyWzFdfTwvc3Bhbj5gO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJNU0NvbXBvbmVudHMoaW5kZXgpIHtcclxuICBjb25zdCB0YXJnZXQgPSBkYXRhQmFzZS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpbmRleF07XHJcbiAgY29uc3QgdGl0bGUgPSBnZXREYXkodGFyZ2V0LmRhdGUpO1xyXG4gIGNvbnN0IGRhdGUgPSBnZXREYXRlKHRhcmdldC5kYXRlKTtcclxuICBjb25zdCBpY29uID0gdGFyZ2V0LmRheS5jb25kaXRpb24uaWNvbjtcclxuICBjb25zdCB0ZXh0ID0gdGFyZ2V0LmRheS5jb25kaXRpb24udGV4dDtcclxuICBjb25zdCB0ZW1wID0gdGFyZ2V0LmRheS5hdmd0ZW1wX2M7XHJcbiAgY29uc3QgZmVlbHNMaWtlID0gXCItLy1cIjtcclxuICBjb25zdCBtYXhUZW1wID0gdGFyZ2V0LmRheS5tYXh0ZW1wX2M7XHJcbiAgY29uc3QgbWluVGVtcCA9IHRhcmdldC5kYXkubWludGVtcF9jO1xyXG4gIGNvbnN0IGNoYW5jZVJhaW4gPSB0YXJnZXQuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWluO1xyXG4gIGNvbnN0IHByZWNpcGl0YXRpb24gPSB0YXJnZXQuZGF5LnRvdGFscHJlY2lwX21tO1xyXG4gIGNvbnN0IHdpbmRTcGVlZCA9IFwiLS8tXCI7XHJcbiAgY29uc3QgaHVtaWRpdHkgPSB0YXJnZXQuZGF5LmF2Z2h1bWlkaXR5O1xyXG4gIGNvbnN0IHN1bnJpc2UgPSBzZXRIb3VyKHRhcmdldC5hc3Ryby5zdW5yaXNlKTtcclxuICBjb25zdCBzdW5zZXQgPSBzZXRIb3VyKHRhcmdldC5hc3Ryby5zdW5zZXQpO1xyXG5cclxuICBjcmVhdGVNU0NvbXBvbmVudHMoXHJcbiAgICB0aXRsZSxcclxuICAgIGRhdGUsXHJcbiAgICBpY29uLFxyXG4gICAgdGV4dCxcclxuICAgIHRlbXAsXHJcbiAgICBmZWVsc0xpa2UsXHJcbiAgICBtYXhUZW1wLFxyXG4gICAgbWluVGVtcCxcclxuICAgIGNoYW5jZVJhaW4sXHJcbiAgICBwcmVjaXBpdGF0aW9uLFxyXG4gICAgd2luZFNwZWVkLFxyXG4gICAgaHVtaWRpdHksXHJcbiAgICBzdW5yaXNlLFxyXG4gICAgc3Vuc2V0XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcmVuZGVyTVNDb21wb25lbnRzIH07XHJcbiIsImxldCBkYXRhQmFzZTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldERhdGEodmFsdWUpIHtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgYGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9YzU1ZWJmODk1ZGE4NDk2OTkxZjIyMjA0MjIzMTgwOSZxPSR7dmFsdWV9JmRheXM9MTAmYXFpPW5vJmFsZXJ0cz1ub2BcclxuICApO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gIGRhdGFCYXNlID0gZGF0YTtcclxufVxyXG5cclxuZXhwb3J0IHtkYXRhQmFzZSwgZ2V0RGF0YX0iLCJpbXBvcnQgeyBkYXRhQmFzZSwgZ2V0RGF0YSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XHJcbmltcG9ydCB7IHJlbmRlckFzaWRlQ29tcG9uZW50IH0gZnJvbSBcIi4vY3JlYXRlQXNDb21wXCI7XHJcbmltcG9ydCB7IHJlbmRlckZvb3RlckNvbXBvbmVudHMgfSBmcm9tIFwiLi9jcmVhdGVGb29Db21wXCI7XHJcbmltcG9ydCB7IHJlbmRlck1TQ29tcG9uZW50cyB9IGZyb20gXCIuL2NyZWF0ZU1haW5TZWN0aW9uXCI7XHJcbmltcG9ydCB7IHJlbmRlckhlYWRlciB9IGZyb20gXCIuL2NyZWF0ZUhlYWRlckNvbXBcIjtcclxuaW1wb3J0IHsgZ2V0RGF0ZUFwaSB9IGZyb20gXCIuL2Nsb2NrXCI7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkb1RoaW5ncyh2YWx1ZSkge1xyXG4gIGF3YWl0IGdldERhdGEodmFsdWUpO1xyXG4gIGNvbnNvbGUubG9nKGRhdGFCYXNlKTsgLy9kaXNwbGF5IHRoaW5ncyAtPiB3YWl0IGZvciBkYXRhXHJcbiAgZ2V0RGF0ZUFwaSgpO1xyXG4gIHJlbmRlckhlYWRlcigpO1xyXG4gIHJlbmRlck1TQ29tcG9uZW50cyhcIjBcIik7XHJcbiAgcmVuZGVyQXNpZGVDb21wb25lbnQoXCIwXCIpO1xyXG4gIHJlbmRlckZvb3RlckNvbXBvbmVudHMoKTtcclxufVxyXG5cclxuZXhwb3J0IHsgZG9UaGluZ3MgfTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyB1cGRhdGVNaWxpIH0gZnJvbSBcIi4vY2xvY2suanNcIjtcclxuaW1wb3J0IHtkb1RoaW5nc30gZnJvbSBcIi4vZG9tLmpzXCJcclxuXHJcbmRvVGhpbmdzKFwibG9uZG9uXCIpO1xyXG5zZWFyY2hPbkNsaWNrKCk7XHJcbnVwZGF0ZU1pbGkoKTtcclxuXHJcbmZ1bmN0aW9uIHNlYXJjaE9uQ2xpY2soKSB7XHJcbiAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKTtcclxuICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0blwiKTtcclxuXHJcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBkb1RoaW5ncyhzZWFyY2hJbnB1dC52YWx1ZSk7XHJcbiAgfSk7XHJcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=