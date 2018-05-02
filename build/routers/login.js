'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _crypto = require('../module/crypto.js');

var _user = require('../module/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = _express2.default.Router(); // 此页面抛出一个login路由


/**
 * 判断是否有token
 * 1: 有token时，将token解密，与数据库匹配，如果匹配成功，返回登录成功的信息，失败则返回登录失败的信息。
 * 2：没有token时，将name字段与数据库匹配，如果匹配成功，返回登录成功的信息，并将name加密生成token；如果
 *                匹配不成功，则返回登录失败的信息。
 */
route.post('/login', function (req, res) {
  var token = req.headers.token;
  var name = req.body.name;

  if (token) {
    (0, _user2.default)((0, _crypto.aesDecode)(token), function (dataInfo) {
      if (dataInfo.code == 1) {
        res.send({
          code: 1,
          msg: 'token解密匹配，登录成功'
        });
      } else {
        res.send({
          code: 0,
          msg: "token解密不匹配，登陆失败"
        });
      }
    });
  } else {
    (0, _user2.default)(name, function (dataInfo) {
      if (dataInfo.code == 1) {
        res.send({
          code: 1,
          msg: '用户名匹配，登录成功',
          token: (0, _crypto.aesEcode)(name)
        });
      } else {
        res.send({
          code: 0,
          msg: '用户名不匹配，登录失败'
        });
      }
    });
  }
});
exports.default = route;