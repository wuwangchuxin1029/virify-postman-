'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require('./config/router');

var _router2 = _interopRequireDefault(_router);

var _user = require('./module/user.js');

var _user2 = _interopRequireDefault(_user);

var _crypto = require('./module/crypto.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import detail from './routers/detail'
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var startTime = new Date().getTime() / 1000; // 初始时间
var differTime = 30; // 超时限制

// 中间件进行全局鉴权
app.use(function (req, res, next) {
  var endTime = new Date().getTime() / 1000 - startTime;
  var name = req.body.name;
  var token = req.headers.token;

  // 第一种情况：有name，用户登录状态，可以继续访问

  if (name) {
    next();
  } else if (!name && !token) {
    // 第二种情况：没有name也没有token
    res.send({
      code: 0,
      msg: '鉴权失败'
    });
  } else {
    // 第三种情况：有token没有name,判断token是否超时
    if (endTime < differTime) {
      next();
    } else {
      res.send({
        code: 0,
        msg: '登录超时，请重新登录'
      });
    }
  }
});

// 调用路由中间件方法
_router2.default.login(app);
_router2.default.detail(app);
app.listen('8008', function () {
  console.log('listen to 8008......');
});

// if((!name && token) || (name && token))