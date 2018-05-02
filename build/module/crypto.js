'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aesDecode = exports.aesEcode = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 加密
var aesEcode = function aesEcode(data) {
  var cipher = _crypto2.default.createCipher('aes192', '999');
  var crypted = cipher.update(data, 'utf-8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

// 解密
var aesDecode = function aesDecode(encrypted) {
  var decipher = _crypto2.default.createDecipher('aes192', '999');
  var decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};

exports.aesEcode = aesEcode;
exports.aesDecode = aesDecode;