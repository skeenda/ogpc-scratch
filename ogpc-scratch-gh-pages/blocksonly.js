webpackJsonp([2],{

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(12);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(7);

var _appStateHoc = __webpack_require__(31);

var _appStateHoc2 = _interopRequireDefault(_appStateHoc);

var _controls = __webpack_require__(36);

var _controls2 = _interopRequireDefault(_controls);

var _blocks = __webpack_require__(107);

var _blocks2 = _interopRequireDefault(_blocks);

var _gui = __webpack_require__(32);

var _gui2 = _interopRequireDefault(_gui);

var _projectLoaderHoc = __webpack_require__(42);

var _projectLoaderHoc2 = _interopRequireDefault(_projectLoaderHoc);

var _blocksOnly = __webpack_require__(538);

var _blocksOnly2 = _interopRequireDefault(_blocksOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
    return { vm: state.vm };
};

var VMBlocks = (0, _reactRedux.connect)(mapStateToProps)(_blocks2.default);
var VMControls = (0, _reactRedux.connect)(mapStateToProps)(_controls2.default);

var BlocksOnly = function BlocksOnly(props) {
    return _react2.default.createElement(
        _gui2.default,
        props,
        _react2.default.createElement(VMBlocks, {
            grow: 1,
            options: {
                media: 'static/blocks-media/'
            }
        }),
        _react2.default.createElement(VMControls, { className: _blocksOnly2.default.controls })
    );
};

var App = (0, _appStateHoc2.default)((0, _projectLoaderHoc2.default)(BlocksOnly));

var appTarget = document.createElement('div');
document.body.appendChild(appTarget);

_reactDom2.default.render(_react2.default.createElement(App, null), appTarget);

/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(539);
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
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./blocks-only.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--1-1!../../node_modules/postcss-loader/lib/index.js??postcss!./blocks-only.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, ".blocks-only_controls_2033j {\r\n    position: absolute;\r\n    z-index: 2;\r\n    top: 10px;\r\n    right: 15px;\r\n}\r\n", ""]);

// exports
exports.locals = {
	"controls": "blocks-only_controls_2033j"
};

/***/ })

},[537]);
//# sourceMappingURL=blocksonly.js.map