/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/js/Calculator.js":
/*!******************************!*\
  !*** ./app/js/Calculator.js ***!
  \******************************/
/*! exports provided: Calculator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Calculator\", function() { return Calculator; });\nclass Calculator {\n  constructor(options) {\n    this.wrap = document.querySelector(`#${options.wrapID}`);\n\n    if (!this.wrap) {\n      return;\n    }\n\n    this.handle = document.querySelector(`.${options.handleClass}`);\n    this.progressBar = document.querySelector(`.${options.progressClass}`);\n    this.value = document.querySelector(`.${options.valueClass}`);\n    this.input = document.querySelector(`.${options.inputClass}`);\n    this.buttons = document.querySelector(`.${options.buttonsWrapClass}`);\n    this.min = 10000;\n    this.max = 2010000;\n    this.data = {\n      handleLeft: this.handle.getBoundingClientRect().left,\n      handleWidth: this.handle.getBoundingClientRect().width,\n      wrapWidth: this.wrap.getBoundingClientRect().width - this.handle.getBoundingClientRect().width,\n      valueWidth: this.value.getBoundingClientRect().width,\n      mouseX: 0\n    };\n    this.checkMouseCoords = this.checkMouseCoords.bind(this);\n    this.changeInputValue = this.changeInputValue.bind(this);\n  }\n\n  checkMouseCoords(e) {\n    const type = e.type;\n\n    if (type === 'touchmove') {\n      const touch = e.changedTouches[0];\n      this.data.mouseX = touch.pageX;\n    } else {\n      this.data.mouseX = e.pageX;\n    }\n\n    let diff = this.data.mouseX - this.data.handleLeft - this.data.handleWidth;\n\n    if (diff > this.data.wrapWidth) {\n      diff = this.data.wrapWidth;\n    }\n\n    if (diff >= 0) {\n      if (this.value.children[0]) {\n        this.value.removeChild(this.value.children[0]);\n      }\n\n      this.value.style.left = `${diff}px`;\n      this.handle.style.left = `${diff}px`;\n      this.progressBar.style.width = `${diff}px`;\n      this.changeInputValue(diff);\n      const buttons = [...this.buttons.children];\n      const self = this;\n      buttons.forEach(function (button) {\n        if (!button.classList.contains('active')) {\n          button.classList.add('active');\n          self.addButtonsLink();\n        }\n      });\n    }\n  }\n\n  changeInputValue(num) {\n    const step = this.data.wrapWidth / ((this.max - this.min) / this.min);\n    let steps = Math.ceil(Math.ceil(num) / step);\n    let str = `$${steps * this.min}`;\n\n    if (str.length < 8 && str.length >= 5) {\n      str = `${str.slice(0, -3)}.000`;\n    } else if (str.length >= 8 && str.length < 11) {\n      str = `${str.slice(0, -6)}.${str.slice(-6, -3)}.000`;\n    }\n\n    this.value.innerHTML = str;\n  }\n\n  changeInput() {\n    this.input.setAttribute('value', this.value.innerHTML);\n  }\n\n  changeValue() {\n    document.body.addEventListener('mousemove', this.checkMouseCoords);\n    document.body.addEventListener('touchmove', this.checkMouseCoords);\n  }\n\n  addButtonsLink() {\n    const self = this;\n    const buttons = [...this.buttons.children];\n    buttons.forEach(function (button) {\n      if (button.classList.contains('active')) {\n        button.addEventListener('click', function () {\n          const btnValue = this.innerHTML;\n          const value = self.input.value;\n          window.localStorage.setItem('pressed button', btnValue);\n          window.localStorage.setItem('property value', value);\n          setTimeout(function () {\n            window.location.href = button.getAttribute('href');\n          }, 300);\n        });\n      }\n    });\n  }\n\n  build() {\n    const self = this;\n    [...this.buttons.children].forEach(function (button) {\n      button.addEventListener('click', e => {\n        e.preventDefault();\n      });\n    });\n    this.addButtonsLink();\n    this.handle.addEventListener('mousedown', function () {\n      self.changeValue();\n    });\n    this.handle.addEventListener('touchstart', function () {\n      self.changeValue();\n    });\n    document.body.addEventListener('mouseup', function () {\n      this.removeEventListener('mousemove', self.checkMouseCoords);\n      self.changeInput();\n    });\n    document.body.addEventListener('touchend', function () {\n      this.removeEventListener('touchmove', self.checkMouseCoords);\n      self.changeInput();\n    });\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///./app/js/Calculator.js?");

/***/ }),

/***/ "./app/js/LiveSearch.js":
/*!******************************!*\
  !*** ./app/js/LiveSearch.js ***!
  \******************************/
/*! exports provided: LiveSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LiveSearch\", function() { return LiveSearch; });\nclass LiveSearch {\n  constructor(options) {\n    this.input = document.querySelector(`#${options.inputID}`);\n    this.wrap = this.input.parentElement;\n    this.liveSearchWrap = document.querySelector(`#${options.liveSearchWrapID}`);\n    this.submitBtn = document.querySelector(`#${options.submitBtnID}`);\n    this.country = 'Canada';\n    this.value = this.input.value;\n    this.platform = options.platform;\n    this.service = options.service;\n    this.externalRequestHandler = this.externalRequestHandler.bind(this);\n    this.removeElem = this.removeElem.bind(this);\n  }\n\n  externalRequestHandler(result) {\n    const self = this;\n\n    if (result.items.length < 25) {\n      result.items.forEach(function (item) {\n        if (item.title.indexOf(self.country) !== -1) {\n          self.liveSearchWrap.insertAdjacentHTML('afterbegin', `\n                        <a href=\"#\" class=\"form-group__livesearch_link\">${item.title}</a>\n                    `);\n        }\n\n        const searchLinks = [...document.getElementsByClassName('form-group__livesearch_link')];\n        searchLinks.forEach(function (link) {\n          link.addEventListener('click', function (e) {\n            e.preventDefault();\n            self.value = this.innerHTML;\n            self.input.value = this.innerHTML;\n            searchLinks.forEach(function (item) {\n              self.removeElem(item);\n            });\n          });\n        });\n      });\n    }\n  }\n\n  changeValue() {\n    this.value = this.input.value;\n  }\n\n  showTolTip(input, toltip = false) {\n    const self = this;\n\n    if (!this.input.classList.contains('warn')) {\n      this.input.classList.add('warn');\n    }\n\n    if (toltip) {\n      if (this.wrap.getElementsByClassName('toltip')[0]) {\n        return;\n      }\n\n      this.wrap.insertAdjacentHTML('afterbegin', `\n                    <p class=\"toltip\">${toltip}</p>\n                `);\n      const elem = this.wrap.getElementsByClassName('toltip')[0];\n      elem.addEventListener('click', function () {\n        self.removeElem(this);\n      });\n    }\n  }\n\n  checkNumberInString(str) {\n    let contain = false;\n\n    for (let i = 0; i < 10; i++) {\n      i = String(i);\n\n      if (str.indexOf(i) !== -1) {\n        contain = true;\n        break;\n      }\n    }\n\n    return contain;\n  }\n\n  checkTolTip() {\n    const el = this.wrap.getElementsByClassName('toltip')[0];\n\n    if (el) {\n      this.removeElem(el);\n    }\n  }\n\n  removeElem(elem) {\n    const parent = elem.parentElement;\n\n    if (parent && parent.children[0]) {\n      parent.removeChild(elem);\n    }\n  }\n\n  submitSuccessAddress(address, url) {\n    window.localStorage.setItem('address', address);\n    setTimeout(function () {\n      window.location.href = url;\n    }, 1500);\n  }\n\n  changeNoteContent(elem, stringsArr) {\n    for (let i = 1; i < stringsArr.length + 1; i++) {\n      let timeout = 300;\n\n      if (i !== 1) {\n        timeout = 2000 * i;\n      }\n\n      setTimeout(function () {\n        elem.innerHTML = stringsArr[i - 1];\n      }, timeout);\n    }\n  }\n\n  listeners() {\n    const self = this;\n    this.input.addEventListener('keydown', () => {\n      this.checkTolTip();\n    });\n    this.input.addEventListener('keyup', () => {\n      this.changeValue();\n    });\n    this.input.addEventListener('keyup', () => {\n      if (self.value.length > 2) {\n        this.service.autosuggest({\n          q: `${self.value}`,\n          at: '38.71014896078624,-98.60787954719035'\n        }, result => {\n          this.externalRequestHandler(result);\n        });\n      }\n    });\n    this.submitBtn.addEventListener('click', e => {\n      e.preventDefault();\n      let success = true;\n\n      if (this.value === \"\") {\n        success = false;\n        this.showTolTip(this.input, 'Please, enter your property address');\n        return;\n      }\n\n      this.service.autosuggest({\n        q: `${this.value}`,\n        at: '38.71014896078624,-98.60787954719035'\n      }, result => {\n        const checkCorrectInput = result.items.some(function (el) {\n          return el.title === self.value;\n        });\n\n        if (!checkCorrectInput) {\n          success = false;\n          this.showTolTip(this.input, 'Please, check your input. <br> We can\\'t find this address');\n        }\n      });\n\n      if (!this.checkNumberInString(this.value)) {\n        success = false;\n        this.showTolTip(this.input, 'Please enter a more precise address');\n        return;\n      }\n\n      if (success) {\n        self.submitBtn.classList.add('active');\n        self.wrap.insertAdjacentHTML('afterbegin', `\n                    <span class=\"form-group__note\"></span>\n                `);\n        const note = document.querySelector('.form-group__note');\n        self.changeNoteContent(note, ['Connect to MLS…', `Checking ${self.value} ...`, 'Fetching data ...', 'Success !']);\n        setTimeout(() => {\n          self.submitSuccessAddress(self.value, './calculator.html');\n        }, 8000);\n      }\n    });\n  }\n\n  build() {\n    this.listeners();\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///./app/js/LiveSearch.js?");

/***/ }),

/***/ "./app/js/Menu.js":
/*!************************!*\
  !*** ./app/js/Menu.js ***!
  \************************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Menu\", function() { return Menu; });\n\n\nclass Menu {\n  constructor(options) {\n    this.btn = options.button;\n    this.hamburger = options.hamburger;\n    this.activeClass = options.activeClass;\n    this.menu = options.menu;\n    this.menuWrap = this.menu.parentElement;\n    this.menuItems = this.menu.querySelector('.m').children;\n    this.menuItems = Array.prototype.slice.call(this.menuItems);\n    this.toggleMenu = this.toggleMenu.bind(this);\n  }\n\n  toggleMenu() {\n    this.hamburger.classList.toggle(this.activeClass);\n    this.menuWrap.classList.toggle(this.activeClass);\n    this.menu.classList.toggle(this.activeClass);\n    this.menuItems.forEach(item => item.classList.toggle(this.activeClass));\n    document.body.classList.toggle('forbid-scroll');\n  }\n\n  listener() {\n    this.btn.addEventListener('click', this.toggleMenu);\n  }\n\n  init() {\n    if (!this.btn || !this.hamburger || !this.activeClass) {\n      return;\n    }\n\n    this.listener();\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///./app/js/Menu.js?");

/***/ }),

/***/ "./app/js/Question.js":
/*!****************************!*\
  !*** ./app/js/Question.js ***!
  \****************************/
/*! exports provided: Question */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Question\", function() { return Question; });\nclass Question {\n  constructor(options) {\n    this.wrap = document.querySelector(`.${options.wrapClass}`);\n    this.buttons = [...this.wrap.querySelector('.question__btns').children];\n    this.title = this.wrap.querySelector('.question__title').innerHTML;\n  }\n\n  saveData(e, elem) {\n    e.preventDefault();\n    const answer = elem.innerHTML;\n    const link = elem.getAttribute('href');\n    window.localStorage.setItem(this.title, answer);\n    setTimeout(function () {\n      window.location.href = link;\n    }, 500);\n  }\n\n  init() {\n    const self = this;\n    this.buttons.forEach(function (button) {\n      button.addEventListener('click', function (e) {\n        self.saveData(e, button);\n      });\n    });\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///./app/js/Question.js?");

/***/ }),

/***/ "./app/js/main.js":
/*!************************!*\
  !*** ./app/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ \"./app/js/Menu.js\");\n/* harmony import */ var _validationClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validationClass */ \"./app/js/validationClass.js\");\n/* harmony import */ var _Calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Calculator */ \"./app/js/Calculator.js\");\n/* harmony import */ var _LiveSearch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LiveSearch */ \"./app/js/LiveSearch.js\");\n/* harmony import */ var _Question__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Question */ \"./app/js/Question.js\");\n\n\n\n\n\n\n\nwindow.addEventListener('load', function () {\n  (function menu() {\n    if (!document.querySelector('.m') && !document.querySelector('.header-menu__btn')) {\n      return;\n    }\n\n    const menu = new _Menu__WEBPACK_IMPORTED_MODULE_0__[\"Menu\"]({\n      button: document.querySelector('.header-menu__btn'),\n      hamburger: document.querySelector('.header-menu__burger'),\n      menu: document.querySelector('.menu'),\n      activeClass: 'active'\n    });\n    menu.init();\n  })();\n\n  (function checkPage() {\n    const page = document.querySelector('.check-page');\n\n    if (!page) {\n      return;\n    }\n\n    const addressElement = document.querySelector('.address__address');\n    const address = window.localStorage.getItem('address');\n    addressElement.innerHTML = address;\n    randomPercent(7, 16);\n    const platform = new H.service.Platform({\n      'apikey': 'UpZjlcVJKVZ8IwCPeXjfD5F0OJZnHnBHtkeRgnG6ivU'\n    });\n    const service = platform.getSearchService();\n    service.geocode({\n      q: address\n    }, result => {\n      showOnMap(result.items[0].position.lat, result.items[0].position.lng);\n    });\n\n    function showOnMap(x, y) {\n      const defaultLayers = platform.createDefaultLayers();\n      const map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map, {\n        zoom: 15,\n        center: {\n          lat: x,\n          lng: y\n        }\n      });\n      const svgMarkup = `<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n            \\t viewBox=\"0 0 48 48\" style=\"enable-background:new 0 0 48 48;\" xml:space=\"preserve\">\n            <style type=\"text/css\">\n            \\t.st0{fill:#50AC2F;}\n            </style>\n            <g>\n            \\t<g>\n            \\t\\t<path class=\"st0\" d=\"M24,34.5c-2.5,0-4.5,2-4.5,4.5c0,0.7,0.2,1.5,0.5,2.1l3.7,6.7c0,0.1,0.1,0.1,0.2,0.1s0.2-0.1,0.2-0.1l3.7-6.7\n            \\t\\t\\tc0.4-0.7,0.5-1.4,0.5-2.1C28.5,36.5,26.5,34.5,24,34.5z M24,41.3c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2s2.2,1,2.2,2.2\n            \\t\\t\\tS25.2,41.3,24,41.3z\"/>\n            \\t</g>\n            </g>\n            </svg>`;\n      const icon = new H.map.Icon(svgMarkup);\n      const coords = {\n        lat: x,\n        lng: y\n      };\n      const marker = new H.map.Marker(coords, {\n        icon: icon\n      });\n      map.addObject(marker);\n      map.setCenter(coords);\n    }\n\n    function randomPercent(min, max) {\n      const percent = Math.round(Math.random() * (max - min) + min);\n      const percentElement = document.querySelector('.sale__info-percent');\n      percentElement.innerHTML = `+${String(percent)}%`;\n    }\n  })();\n\n  (function questionPage() {\n    const page = document.querySelector('.question-page');\n\n    if (!page) {\n      return;\n    }\n\n    const question = new _Question__WEBPACK_IMPORTED_MODULE_4__[\"Question\"]({\n      wrapClass: 'question'\n    });\n    question.init();\n  })();\n\n  (function liveSearch() {\n    if (!document.getElementById('livesearch')) {\n      return false;\n    }\n\n    const platform = new H.service.Platform({\n      'apikey': 'UpZjlcVJKVZ8IwCPeXjfD5F0OJZnHnBHtkeRgnG6ivU'\n    });\n    const service = platform.getSearchService();\n    const searchField = new _LiveSearch__WEBPACK_IMPORTED_MODULE_3__[\"LiveSearch\"]({\n      inputID: 'check-address__input',\n      liveSearchWrapID: 'livesearch',\n      submitBtnID: 'check-address__btn',\n      platform: platform,\n      service: service\n    });\n    searchField.build();\n  })();\n\n  (function calculator() {\n    if (!document.getElementById('calculator')) {\n      return;\n    }\n\n    const calc = new _Calculator__WEBPACK_IMPORTED_MODULE_2__[\"Calculator\"]({\n      wrapID: 'calculator',\n      handleClass: 'calculator__bar_handle',\n      progressClass: 'calculator__bar_progress',\n      valueClass: 'calculator__value',\n      inputClass: 'calculator__input',\n      buttonsWrapClass: 'calculator__btns'\n    });\n    calc.build();\n    const addressElem = document.querySelector('.page-caption>span');\n    const address = localStorage.getItem('address');\n    addressElem.innerHTML = `we found: ${address} !`;\n  })();\n\n  (function validation() {\n    const form = document.querySelector('#form');\n\n    if (!form) {\n      return;\n    }\n\n    const valid = new _validationClass__WEBPACK_IMPORTED_MODULE_1__[\"Validation\"]({\n      submitBtn: 'form-btn',\n      firstName: 'f-name',\n      lastName: 'l-name',\n      phone: 'phone',\n      checkbox: 'check'\n    });\n    valid.init();\n    valid.submitBtn.addEventListener('click', function (e) {\n      e.preventDefault();\n\n      if (valid.success) {\n        setTimeout(function () {\n          document.location.href = './thank-you.html';\n        }, 1000);\n      }\n    }); // addCalculatorData();\n\n    function addCalculatorData() {\n      const ageInput = form.querySelector('#age');\n      const problemInput = form.querySelector('#problem');\n      const ageValue = localStorage.getItem('age');\n      const problemValue = localStorage.getItem('problem');\n      ageInput.value = ageValue;\n      problemInput.value = problemValue;\n    }\n  })();\n});\n\n//# sourceURL=webpack:///./app/js/main.js?");

/***/ }),

/***/ "./app/js/validationClass.js":
/*!***********************************!*\
  !*** ./app/js/validationClass.js ***!
  \***********************************/
/*! exports provided: Validation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Validation\", function() { return Validation; });\n\n\nclass CheckEmpty extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'CheckEmpty';\n  }\n\n}\n\nclass NameValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'NameValidationError';\n  }\n\n}\n\nclass CheckLength extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'CheckLength';\n  }\n\n}\n\nclass CheckEmail extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'CheckEmail';\n  }\n\n}\n\nclass CheckPhone extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'CheckPhone';\n  }\n\n}\n\nclass CheckCheckbox extends Error {\n  constructor(message) {\n    super(message);\n    this.name = 'CheckCheckbox';\n  }\n\n}\n\nclass Validation {\n  constructor(options) {\n    this.submitBtn = document.getElementById(options.submitBtn);\n    this.inputs = {\n      lastName: document.getElementById(options.lastName),\n      firstName: document.getElementById(options.firstName),\n      phone: document.getElementById(options.phone),\n      email: document.getElementById(options.email),\n      checkbox: document.getElementById(options.checkbox)\n    };\n    this.promocode = false;\n    this.subscription = '';\n    this.success = false;\n  }\n\n  checkEmpty(inputValue) {\n    if (inputValue === '') {\n      throw new CheckEmpty('This field is required');\n    }\n\n    return inputValue;\n  }\n\n  checkLength(inputValue, minLength, maxLength) {\n    const inputLength = inputValue.length;\n\n    if (inputLength < minLength) {\n      throw new CheckLength(`The field must contain at least ${minLength} characters`);\n    }\n\n    if (inputLength > maxLength) {\n      throw new CheckLength(`The number of characters is more than ${maxLength}. Enter the correct data`);\n    }\n  }\n\n  checkName(input) {\n    const inputValue = input.value;\n    this.checkEmpty(inputValue);\n    this.checkLength(inputValue, 2, 50);\n    const regExp = /^[a-zA-Z]+$/;\n\n    if (!regExp.test(inputValue)) {\n      throw new NameValidationError('Only letters of the English alphabet are allowed');\n    }\n\n    return inputValue;\n  }\n\n  checkCheckbox(input) {\n    const inputValue = input.checked;\n\n    if (!inputValue) {\n      throw new CheckCheckbox('This field is required');\n    }\n\n    return inputValue;\n  }\n\n  checkPhone(input) {\n    const inputValue = input.value;\n    this.checkEmpty(inputValue);\n    const numberLength = 16;\n    const regExp = /\\+1\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}/;\n\n    if (!regExp.test(inputValue) || inputValue.length !== numberLength) {\n      throw new CheckPhone('Invalid phone number');\n    }\n\n    return inputValue;\n  }\n\n  maskPhone(input) {\n    new IMask(input, {\n      mask: '+{1}(000)000-00-00'\n    });\n  }\n\n  checkEmail(input) {\n    const inputValue = input.value;\n    this.checkEmpty(inputValue);\n    this.checkLength(inputValue, 3, 50);\n    const regExp = /^[\\w]{1}[\\w-\\.]*@[\\w-]+\\.[a-z]{2,4}$/i;\n\n    if (!regExp.test(inputValue)) {\n      throw new CheckEmail('Invalid Email format');\n    }\n\n    return inputValue;\n  }\n\n  createWarningMessage(message) {\n    const paragraph = document.createElement('p');\n    paragraph.className = 'warning';\n    paragraph.innerHTML = message;\n    return paragraph;\n  }\n\n  catchErrors(input, e, ...args) {\n    for (const argsItem of args) {\n      if (e instanceof argsItem) {\n        const messageElement = this.createWarningMessage(e.message);\n        input.parentElement.appendChild(messageElement);\n        input.classList.add('warn');\n      }\n    }\n  }\n\n  check() {\n    const errors = [];\n\n    for (const input in this.inputs) {\n      const elem = this.inputs[input];\n\n      if (!elem) {\n        continue;\n      }\n\n      switch (input) {\n        case 'firstName':\n          try {\n            this.checkName(elem);\n          } catch (e) {\n            this.catchErrors(elem, e, CheckEmpty, CheckLength, NameValidationError);\n            errors.push(e);\n          }\n\n          break;\n\n        case 'lastName':\n          try {\n            this.checkName(elem);\n          } catch (e) {\n            this.catchErrors(elem, e, CheckEmpty, CheckLength, NameValidationError);\n            errors.push(e);\n          }\n\n          break;\n\n        case 'phone':\n          try {\n            this.checkPhone(elem);\n          } catch (e) {\n            this.catchErrors(elem, e, CheckEmpty, CheckPhone);\n            errors.push(e);\n          }\n\n          break;\n\n        case 'email':\n          try {\n            this.checkEmail(elem);\n          } catch (e) {\n            this.catchErrors(elem, e, CheckEmpty, CheckLength, CheckEmail);\n            errors.push(e);\n          }\n\n          break;\n\n        case 'checkbox':\n          try {\n            this.checkCheckbox(elem);\n          } catch (e) {\n            this.catchErrors(elem, e, CheckCheckbox);\n            errors.push(e);\n          }\n\n          break;\n      }\n    }\n\n    if (errors.length === 0) {\n      this.success = true;\n    }\n  }\n\n  init() {\n    this.maskPhone(this.inputs.phone);\n    this.submitBtn.addEventListener('click', e => {\n      const warningMessages = document.getElementsByClassName('warning');\n      let invalidInputs = document.getElementsByClassName('warn');\n\n      if (warningMessages[0]) {\n        while (warningMessages.length) {\n          warningMessages[0].parentNode.removeChild(warningMessages[0]);\n        }\n      }\n\n      if (invalidInputs) {\n        invalidInputs = Array.prototype.slice.call(invalidInputs);\n\n        for (let i = 0, length = invalidInputs.length; i < length; i++) {\n          if (invalidInputs[i].classList.contains('warn')) {\n            invalidInputs[i].classList.remove('warn');\n          }\n        }\n      }\n\n      this.check();\n    });\n    return this.success;\n  }\n\n}\n\n\n\n//# sourceURL=webpack:///./app/js/validationClass.js?");

/***/ })

/******/ });