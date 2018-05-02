'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _login2 = require('../routers/login');

var _login3 = _interopRequireDefault(_login2);

var _detail2 = require('../routers/detail');

var _detail3 = _interopRequireDefault(_detail2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 引入路由 ，抛出一个路由中间件的方法
exports.default = {
  login: function login(app) {
    app.post('/login', _login3.default);
  },
  detail: function detail(app) {
    _detail3.default.post('/detail', _detail3.default);
  }
};