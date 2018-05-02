// 此页面抛出一个login路由
import express from 'express'
const route = express.Router()
import { aesEcode, aesDecode } from '../module/crypto.js'
import getInfo from '../module/user.js'

/**
 * 判断是否有token
 * 1: 有token时，将token解密，与数据库匹配，如果匹配成功，返回登录成功的信息，失败则返回登录失败的信息。
 * 2：没有token时，将name字段与数据库匹配，如果匹配成功，返回登录成功的信息，并将name加密生成token；如果
 *                匹配不成功，则返回登录失败的信息。
 */
route.post('/login', (req, res) => {
  let { token } = req.headers
  let { name } = req.body
  if (token) {
    getInfo(aesDecode(token), (dataInfo) => {
      if (dataInfo.code == 1) {
        res.send({
          code: 1,
          msg: 'token解密匹配，登录成功'
        })
      } else {
        res.send({
          code: 0,
          msg: "token解密不匹配，登陆失败"
        })
      }
    })
  } else {
    getInfo(name, (dataInfo) => {
      if (dataInfo.code == 1){
        res.send({
          code: 1,
          msg:'用户名匹配，登录成功',
          token:aesEcode(name)
        })
      }else{
        res.send({
          code: 0,
          msg:'用户名不匹配，登录失败'
        })
      }
    })
  }
})
export default route

