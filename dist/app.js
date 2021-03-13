/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var rlis_1 = __webpack_require__(/*! ./rlis */ "./src/rlis.ts");

var rlis = new rlis_1.RLIS();
var Item_T;

(function (Item_T) {
  Item_T[Item_T["Item"] = 0] = "Item";
  Item_T[Item_T["Blueprint"] = 1] = "Blueprint";
})(Item_T || (Item_T = {}));

; //
// Random class
//

var Random = /*#__PURE__*/function () {
  function Random() {
    _classCallCheck(this, Random);
  }

  _createClass(Random, null, [{
    key: "getInclusiveInt",
    value: function getInclusiveInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }]);

  return Random;
}(); //
// Interface class
//


var Interface = /*#__PURE__*/function () {
  function Interface() {
    _classCallCheck(this, Interface);
  }

  _createClass(Interface, null, [{
    key: "setVisibility",
    value: function setVisibility(element, visibility) {
      var ecl = element.classList;

      if (visibility) {
        if (!ecl.contains("d-none")) return;
        ecl.remove("d-none");
      } else {
        if (ecl.contains("d-none")) return;
        ecl.add("d-none");
      }
    }
  }, {
    key: "initializeForm",
    value: function initializeForm() {
      // Populate quality select with options
      var inventory = rlis.getInventory();
      var item_type = this.el.selection.item_type_item.checked ? Item_T.Item : Item_T.Blueprint;
      var selection = this.el.selection.quality_select;
      var option_template = this.el.selection.templates.quality_option;
      var local_inventory = item_type ? inventory.blueprints : inventory.items;
      var local_inventory_keys = Object.keys(local_inventory);
      selection.innerHTML = "";
      local_inventory_keys.forEach(function (key) {
        if (local_inventory[key].length == 0) return;
        var option_temp = option_template.content.cloneNode(true);
        var option_temp_element = option_temp.querySelector("option");
        option_temp_element.value = key;
        option_temp_element.innerHTML = key + " (".concat(local_inventory[key].length, ")");
        selection.appendChild(option_temp);
      });
    }
  }, {
    key: "showPricing",
    value: function showPricing() {
      var inventory = rlis.getInventory();
      var selection = this.el.selection.quality_select;
      var table_body = this.el.pricing.table_body;
      var table_row_template = this.el.pricing.templates.table_row;
      var table_row_template_root = table_row_template.root;
      var item_type = this.el.selection.item_type_item.checked ? Item_T.Item : Item_T.Blueprint;
      var option_selected = selection.value;
      var local_inventory = item_type ? inventory.blueprints[option_selected] : inventory.items[option_selected];
      table_body.innerHTML = "";

      for (var i = 0; i < local_inventory.length; i++) {
        var item = local_inventory[i];
        var row_temp = table_row_template_root.content.cloneNode(true);
        var el_id = row_temp.querySelector(table_row_template.elementsId.id);
        var el_name = row_temp.querySelector(table_row_template.elementsId.name);
        var el_paint = row_temp.querySelector(table_row_template.elementsId.paint);
        var el_certificate = row_temp.querySelector(table_row_template.elementsId.certificate);
        var el_amount = row_temp.querySelector(table_row_template.elementsId.amount);
        var el_value = row_temp.querySelector(table_row_template.elementsId.value);
        el_id.innerHTML = i + 1;
        el_name.innerHTML = item.name;
        el_paint.innerHTML = item.paint;
        el_certificate.innerHTML = item.certificate;
        el_amount.innerHTML = item.amount;
        el_value.innerHTML = Random.getInclusiveInt(10, 1000);
        table_body.appendChild(row_temp);
      }

      Interface.setVisibility(this.el.pricing.container, true);
    }
  }]);

  return Interface;
}();

Interface.el = {
  init: {
    container: document.getElementById("containerFile"),
    file: document.getElementById("initFile"),
    submit: document.getElementById("initSubmit")
  },
  spinner: {
    container: document.getElementById("containerLoadSpinner")
  },
  selection: {
    container: document.getElementById("containerSelection"),
    quality_select: document.getElementById("qualitySelect"),
    item_type_item: document.getElementById("itemTypeRadio0"),
    item_type_blueprint: document.getElementById("itemTypeRadio1"),
    submit: document.getElementById("filterSubmit"),
    templates: {
      quality_option: document.getElementById("templateQualityOption")
    }
  },
  pricing: {
    container: document.getElementById("containerPricing"),
    table_body: document.getElementById("pricingTableBody"),
    templates: {
      table_row: {
        root: document.getElementById("templatePricingTableRow"),
        elementsId: {
          id: "#ptr_id",
          name: "#ptr_name",
          paint: "#ptr_paint",
          certificate: "#ptr_certificate",
          amount: "#ptr_amount",
          value: "#ptr_value"
        }
      }
    }
  }
}; //
// Events
//

Interface.el.init.submit.addEventListener("click", function () {
  var file = Interface.el.init.file.files[0];

  if (typeof file == "undefined") {
    alert("You need to choose a file!");
    return;
  }

  rlis.parseRawFile(file);
});
Interface.el.selection.item_type_item.addEventListener("change", function () {
  Interface.initializeForm();
});
Interface.el.selection.item_type_blueprint.addEventListener("change", function () {
  Interface.initializeForm();
});
Interface.el.selection.submit.addEventListener("click", function () {
  Interface.showPricing();
});
document.addEventListener("interface_load_start", function () {
  Interface.setVisibility(Interface.el.init.container, false);
  Interface.setVisibility(Interface.el.spinner.container, true);
});
document.addEventListener("interface_load_end", function () {
  Interface.setVisibility(Interface.el.spinner.container, false);
  Interface.setVisibility(Interface.el.selection.container, true);
  Interface.initializeForm();
});

/***/ }),

/***/ "./src/rlis.ts":
/*!*********************!*\
  !*** ./src/rlis.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RLIS = void 0;

var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");

var stucts_1 = __webpack_require__(/*! ./stucts */ "./src/stucts.ts");

var RLIS = /*#__PURE__*/function () {
  function RLIS() {
    _classCallCheck(this, RLIS);

    this.inventory = {
      items: new stucts_1.ItemContainer(),
      blueprints: new stucts_1.BlueprintContainer()
    };
  } //
  // Public
  //


  _createClass(RLIS, [{
    key: "parseRawFile",
    value: function parseRawFile(file) {
      var _this = this;

      if (typeof file == "undefined") {
        alert("File read errror");
        return;
      }

      if (!utils_1.Validator.isFileAJson(file)) {
        alert("File is not a JSON");
        return;
      }

      var fileReader = new FileReader();

      fileReader.onload = function (event) {
        var content = event.target.result;
        var json = JSON.parse(content);

        _this.parseInventoryFromJson(json.inventory);
      };

      fileReader.readAsText(file);
    }
  }, {
    key: "getInventory",
    value: function getInventory() {
      return this.inventory;
    } //
    // Private
    //

  }, {
    key: "parseInventoryFromJson",
    value: function parseInventoryFromJson(inventory) {
      EventManager.emitEvent(EventManager.types.interface_load_start);

      for (var i = 0; i < inventory.length; i++) {
        var item = inventory[i];
        if (item.tradeable == "false") continue;
        if (item.blueprint_cost == 0) this.populateItem(item);else this.populateBlueprint(item);
      }

      setTimeout(function () {
        EventManager.emitEvent(EventManager.types.interface_load_end);
      }, 2000);
    }
  }, {
    key: "populateItem",
    value: function populateItem(item) {
      var qstring = item.quality.toLowerCase().replace(/\s+/g, '');
      var it = {
        name: item.name,
        amount: item.amount,
        quality: qstring,
        paint: item.paint,
        certificate: item.rank_label,
        product_id: item.product_id
      };
      this.inventory.items[it.quality].push(it);
    }
  }, {
    key: "populateBlueprint",
    value: function populateBlueprint(item) {
      var qstring = item.quality.toLowerCase().replace(/\s+/g, '');
      var bp = {
        name: item.blueprint_item,
        amount: item.amount,
        quality: qstring,
        paint: item.paint,
        certificate: item.rank_label,
        product_id: item.product_id,
        bp_item_id: item.blueprint_item_id,
        bp_cost: item.blueprint_cost
      };
      this.inventory.blueprints[bp.quality].push(bp);
    }
  }]);

  return RLIS;
}();

exports.RLIS = RLIS;

var EventManager = /*#__PURE__*/function () {
  function EventManager() {
    _classCallCheck(this, EventManager);
  }

  _createClass(EventManager, null, [{
    key: "emitEvent",
    value: function emitEvent(name) {
      document.dispatchEvent(new Event(name));
    }
  }, {
    key: "emitEventWithData",
    value: function emitEventWithData(name, data) {
      document.dispatchEvent(new CustomEvent(name, data));
    }
  }]);

  return EventManager;
}();

EventManager.types = {
  interface_load_start: "interface_load_start",
  interface_load_end: "interface_load_end",
  data_inventory: "data_inventory"
};

/***/ }),

/***/ "./src/stucts.ts":
/*!***********************!*\
  !*** ./src/stucts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BlueprintContainer = exports.ItemContainer = void 0;

var ItemContainer = function ItemContainer() {
  _classCallCheck(this, ItemContainer);

  this.uncommon = [];
  this.common = [];
  this.rare = [];
  this.veryrare = [];
  this["import"] = [];
  this.exotic = [];
  this.blackmarket = [];
  this.limited = [];
};

exports.ItemContainer = ItemContainer;

var BlueprintContainer = function BlueprintContainer() {
  _classCallCheck(this, BlueprintContainer);

  this.uncommon = [];
  this.common = [];
  this.rare = [];
  this.veryrare = [];
  this["import"] = [];
  this.exotic = [];
  this.blackmarket = [];
  this.limited = [];
};

exports.BlueprintContainer = BlueprintContainer;

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Validator = void 0;

var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: "isFileAJson",
    value: function isFileAJson(file) {
      return file.type == "application/json";
    }
  }]);

  return Validator;
}();

exports.Validator = Validator;

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/dist/app": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/app.ts"],
/******/ 			["./src/app.scss"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkRocketLeagueInventoryScannernp"] = self["webpackChunkRocketLeagueInventoryScannernp"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;