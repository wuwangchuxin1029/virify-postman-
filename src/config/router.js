// 引入路由 ，抛出一个路由中间件的方法
import login from '../routers/login'
import detail from '../routers/detail'

export default {
  login: (app) => {
    app.post('/login', login)
  },
  detail: (app) => {
    detail.post('/detail', detail)
  }
}

