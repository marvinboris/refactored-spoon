(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./resources/js/src/containers/Backend/User/Languages/Add.js":
/*!*******************************************************************!*\
  !*** ./resources/js/src/containers/Backend/User/Languages/Add.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "./node_modules/@fortawesome/free-regular-svg-icons/index.es.js");
/* harmony import */ var _components_Backend_UI_Breadcrumb_Breadcrumb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../components/Backend/UI/Breadcrumb/Breadcrumb */ "./resources/js/src/components/Backend/UI/Breadcrumb/Breadcrumb.js");
/* harmony import */ var _components_UI_Titles_SpecialTitle_SpecialTitle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/UI/Titles/SpecialTitle/SpecialTitle */ "./resources/js/src/components/UI/Titles/SpecialTitle/SpecialTitle.js");
/* harmony import */ var _components_UI_Titles_Subtitle_Subtitle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/UI/Titles/Subtitle/Subtitle */ "./resources/js/src/components/UI/Titles/Subtitle/Subtitle.js");
/* harmony import */ var _components_Error_Error__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/Error/Error */ "./resources/js/src/components/Error/Error.js");
/* harmony import */ var _components_UI_CustomSpinner_CustomSpinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/UI/CustomSpinner/CustomSpinner */ "./resources/js/src/components/UI/CustomSpinner/CustomSpinner.js");
/* harmony import */ var _components_Backend_UI_Form_Form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/Backend/UI/Form/Form */ "./resources/js/src/components/Backend/UI/Form/Form.js");
/* harmony import */ var _components_Backend_UI_Input_Input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/Backend/UI/Input/Input */ "./resources/js/src/components/Backend/UI/Input/Input.js");
/* harmony import */ var _components_UI_Button_BetweenButton_BetweenButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/UI/Button/BetweenButton/BetweenButton */ "./resources/js/src/components/UI/Button/BetweenButton/BetweenButton.js");
/* harmony import */ var _components_Feedback_Feedback__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/Feedback/Feedback */ "./resources/js/src/components/Feedback/Feedback.js");
/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../store/actions */ "./resources/js/src/store/actions/index.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../shared/utility */ "./resources/js/src/shared/utility.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // Components













var Add = /*#__PURE__*/function (_Component) {
  _inherits(Add, _Component);

  var _super = _createSuper(Add);

  function Add() {
    var _this;

    _classCallCheck(this, Add);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      name: '',
      abbr: '',
      flag: '',
      countries: []
    });

    _defineProperty(_assertThisInitialized(_this), "submitHandler", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(e) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();

                if (!_this.props.edit) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return _this.props.patch(_this.props.match.params.languageId, e.target);

              case 4:
                _context.next = 8;
                break;

              case 6:
                _context.next = 8;
                return _this.props.post(e.target);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "inputChangeHandler", function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value,
          files = _e$target.files;

      _this.setState(_defineProperty({}, name, files ? files[0] : value));
    });

    return _this;
  }

  _createClass(Add, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var cors, phoneRes, namesRes, phone, names, countries;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.props.reset();
                if (this.props.edit) this.props.show(this.props.match.params.languageId);
                cors = 'https://cors-anywhere.herokuapp.com/';
                _context2.next = 5;
                return fetch(cors + 'http://country.io/phone.json', {
                  method: 'GET',
                  mode: 'cors'
                });

              case 5:
                phoneRes = _context2.sent;
                _context2.next = 8;
                return fetch(cors + 'http://country.io/names.json', {
                  method: 'GET',
                  mode: 'cors'
                });

              case 8:
                namesRes = _context2.sent;
                _context2.next = 11;
                return phoneRes.json();

              case 11:
                phone = _context2.sent;
                _context2.next = 14;
                return namesRes.json();

              case 14:
                names = _context2.sent;
                countries = Object.keys(phone).map(function (key) {
                  return {
                    country: key,
                    code: phone[key],
                    name: names[key]
                  };
                }).sort(function (a, b) {
                  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                });
                this.setState({
                  countries: countries
                });

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.reset();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$content$c = _this$props.content.cms.pages,
          save = _this$props$content$c.components.form.save,
          _this$props$content$c2 = _this$props$content$c.backend.pages.languages,
          title = _this$props$content$c2.title,
          add = _this$props$content$c2.add,
          edit = _this$props$content$c2.edit,
          index = _this$props$content$c2.index,
          form = _this$props$content$c2.form,
          _this$props$backend$l = _this$props.backend.languages,
          loading = _this$props$backend$l.loading,
          error = _this$props$backend$l.error,
          message = _this$props$backend$l.message,
          features = _this$props.auth.data.role.features;
      var _this$state = this.state,
          name = _this$state.name,
          abbr = _this$state.abbr,
          flag = _this$state.flag,
          countries = _this$state.countries;
      var content = null;
      var errors = null;
      var feature = features.find(function (f) {
        return f.prefix === 'languages';
      });
      var redirect = !(feature && JSON.parse(feature.permissions).includes(this.props.edit ? 'u' : 'c')) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Redirect"], {
        to: "/user/dashboard"
      });
      var countriesOptions = countries.map(function (_ref2) {
        var country = _ref2.country,
            code = _ref2.code,
            name = _ref2.name;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
          key: country,
          value: country,
          code: code
        }, name);
      });
      if (loading) content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_UI_CustomSpinner_CustomSpinner__WEBPACK_IMPORTED_MODULE_11__["default"], null));else {
        errors = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Error_Error__WEBPACK_IMPORTED_MODULE_10__["default"], {
          err: error
        }));
        content = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Backend_UI_Form_Form__WEBPACK_IMPORTED_MODULE_12__["default"], {
          onSubmit: this.submitHandler,
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faLanguage"],
          title: this.props.edit ? edit : add,
          list: index,
          link: "/user/languages",
          innerClassName: "row",
          className: "shadow-sm"
        }, this.props.edit && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
          type: "hidden",
          name: "_method",
          defaultValue: "PATCH"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          lg: 8
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Feedback_Feedback__WEBPACK_IMPORTED_MODULE_15__["default"], {
          message: message
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Backend_UI_Input_Input__WEBPACK_IMPORTED_MODULE_13__["default"], {
          type: "text",
          className: "col-md-6",
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faLanguage"],
          onChange: this.inputChangeHandler,
          value: name,
          name: "name",
          required: true,
          placeholder: form.name
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Backend_UI_Input_Input__WEBPACK_IMPORTED_MODULE_13__["default"], {
          type: "text",
          className: "col-md-6",
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faLanguage"],
          onChange: this.inputChangeHandler,
          value: abbr,
          name: "abbr",
          required: true,
          placeholder: form.abbr
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Backend_UI_Input_Input__WEBPACK_IMPORTED_MODULE_13__["default"], {
          className: "col-md-6",
          type: "select",
          addon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
            className: "text-secondary text-small d-inline-flex"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
            className: "rounded-circle overflow-hidden position-relative d-flex justify-content-center align-items-center",
            style: {
              width: 30,
              height: 30
            }
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
            className: "flag-icon text-xx-large position-absolute flag-icon-".concat(flag.toLowerCase())
          }))),
          onChange: this.inputChangeHandler,
          value: flag,
          validation: {
            required: true
          },
          name: "flag",
          required: true,
          placeholder: form.select_flag
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", null, form.select_flag), countriesOptions), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: "col-12"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_UI_Button_BetweenButton_BetweenButton__WEBPACK_IMPORTED_MODULE_14__["default"], {
          color: "green",
          icon: _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_6__["faSave"]
        }, save)))))));
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "bg-soft py-4 pl-5 pr-4 position-relative"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Backend_UI_Breadcrumb_Breadcrumb__WEBPACK_IMPORTED_MODULE_7__["default"], {
        items: this.props.edit && [{
          to: '/user/languages',
          content: index
        }],
        main: this.props.edit ? edit : add,
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faLanguage"]
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_UI_Titles_SpecialTitle_SpecialTitle__WEBPACK_IMPORTED_MODULE_8__["default"], {
        user: true,
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_5__["faLanguage"]
      }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_UI_Titles_Subtitle_Subtitle__WEBPACK_IMPORTED_MODULE_9__["default"], {
        user: true
      }, this.props.edit ? edit : add)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "p-4 pb-0"
      }, redirect, errors, content));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.backend.languages.language && prevState.name === '') {
        var language = nextProps.backend.languages.language;
        return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_17__["updateObject"])(prevState, _objectSpread({}, language));
      }

      return prevState;
    }
  }]);

  return Add;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return _objectSpread({}, state);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    show: function show(id) {
      return dispatch(_store_actions__WEBPACK_IMPORTED_MODULE_16__["getLanguage"](id));
    },
    post: function post(data) {
      return dispatch(_store_actions__WEBPACK_IMPORTED_MODULE_16__["postLanguages"](data));
    },
    patch: function patch(data) {
      return dispatch(_store_actions__WEBPACK_IMPORTED_MODULE_16__["patchLanguages"](data));
    },
    reset: function reset() {
      return dispatch(_store_actions__WEBPACK_IMPORTED_MODULE_16__["resetLanguages"]());
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["withRouter"])(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Add)));

/***/ })

}]);