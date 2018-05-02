import express from 'express'
import bodyParser from 'body-parser'
import router from './config/router'
// import detail from './routers/detail'
import getInfo from './module/user.js'
import { aesEcode, aesDecode } from './module/crypto.js'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


let startTime = new Date().getTime() / 1000  // 初始时间
const differTime = 30    // 超时限制

// 中间件进行全局鉴权
app.use(function(req, res, next){
  let endTime = (new Date().getTime()/1000) - startTime
  let { name } = req.body
  let { token } = req.headers

  // 第一种情况：有name，用户登录状态，可以继续访问
  if(name){
    next()
  }else if(!name && !token){
    // 第二种情况：没有name也没有token
    res.send({
      code:0,
      msg:'鉴权失败',
    })
  }else {
    // 第三种情况：有token没有name,判断token是否超时
    if(endTime < differTime){
      next()
    }else{
      res.send({
        code: 0,
        msg:'登录超时，请重新登录'
      })
    }
  }

})

// 调用路由中间件方法
router.login(app)
router.detail(app)
app.listen('8008',() => {
  console.log('listen to 8008......')
})

// if((!name && token) || (name && token))