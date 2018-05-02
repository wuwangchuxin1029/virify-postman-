import crypto from 'crypto'

// 加密
const aesEcode = (data) => {
  let cipher = crypto.createCipher('aes192','999')
  let crypted = cipher.update(data, 'utf-8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

// 解密
const aesDecode = (encrypted) => {
  let decipher = crypto.createDecipher('aes192','999')
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8')
 return decrypted
}

export {
  aesEcode,
  aesDecode
}