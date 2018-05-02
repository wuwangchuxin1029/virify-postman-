'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//连接数据库 
var connection = _mysql2.default.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '831029',
  database: 'admin',
  insecureAuth: true
});

// 检查连接是否正常
connection.connect(function (err) {
  if (err) {
    throw err;
  }
});

// 封装方法，匹配数据库

exports.default = function (username, callback) {
  connection.query('select * from logins where name=?', [username], function (err, result) {
    if (err) {
      throw err;
    }
    // 判断result是否有匹配的内容
    if (result.length > 0) {
      callback({
        code: 1,
        info: '匹配成功'
      });
    } else {
      callback({
        code: 0,
        info: '匹配失败'
      });
    }
  });
};