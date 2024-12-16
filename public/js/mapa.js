/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n    // Constantes y variable\n    const lat = 40.4530822\n    const lng = -3.6903137\n    const mapa = L.map('mapa').setView([lat, lng ], 17)  // L es lo que contiene toda la información de Leaflet\n    let marker\n\n    // Utilizar Provider y Geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService()\n\n    // Dibujo del mapa?\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa)\n\n    // Pin\n    marker = new L.marker([lat, lng], {\n        draggable: true, // Se puede mover el pin\n        autoPan: true // Una vez movido el pin, se vuelve a centrar el mapa\n    })\n    .addTo(mapa) // Añade a la instancia de marker \n\n    // Detectar el movimiento del pin\n    marker.on('moveend', function(e){ // Manejo evento que provee Leaflet\n        marker = e.target \n        const posicion = marker.getLatLng() // Metodo para extraer longitu y latitud\n        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng)) // Toma el mapa y lo centra en funcipon a la posición del pin\n\n        // Obtener la información de las calles al soltar el pin\n        geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado){\n            console.log(resultado) // Objeto con información de posición\n            marker.bindPopup(resultado.address.LongLabel)\n            \n        })\n    })\n})()\n\n//# sourceURL=webpack://bienesraicses_mvc_node/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;