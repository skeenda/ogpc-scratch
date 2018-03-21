webpackJsonp([0],{

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(165);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactModal = __webpack_require__(17);

var _reactModal2 = _interopRequireDefault(_reactModal);

var _appStateHoc = __webpack_require__(31);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _gui = __webpack_require__(32);

var _gui2 = _interopRequireDefault(_gui);

var _projectLoaderHoc = __webpack_require__(42);

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

var _index = __webpack_require__(535);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (false) {
    // Warn before navigating away
    window.onbeforeunload = function () {
        return true;
    };
}

var App = (0, _appStateHoc2.default)((0, _projectLoaderHoc2.default)(_gui2.default));

var appTarget = document.createElement('div');
appTarget.className = _index2.default.app;
document.body.appendChild(appTarget);

_reactModal2.default.setAppElement(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(166).polyfill();


/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(536);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/lib/index.js??postcss!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--1-1!../node_modules/postcss-loader/lib/index.js??postcss!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "html,\r\nbody,\r\n.index_app_1fWu1 {\r\n    /* probably unecessary, transitional until layout is refactored */\r\n    width: 100%; \r\n    height: 100%;\r\n    margin: 0;\r\n}\r\n\r\n/* @todo: move globally? Safe / side FX, for blocks particularly? */\r\n\r\n* { -webkit-box-sizing: border-box; box-sizing: border-box; }\r\n", ""]);

// exports
exports.locals = {
	"app": "index_app_1fWu1"
};

/***/ })

},[164]);
//# sourceMappingURL=gui.js.map