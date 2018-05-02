import mysql from 'mysql'

//连接数据库 
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '831029',                                                           
  database: 'admin',
  insecureAuth: true
})

// 检查连接是否正常
 connection.connect(err => {
  if(err){
    throw err
  }
 })

                                                                                                                                                                                                                                                                                              
 // 封装方法，匹配数据库
export default (username, callback) => {
  connection.query('select * from logins where name=?', [username], (err, result) => {
    if (err) {
      throw err
    }
    // 判断result是否有匹配的内容
    if (result.length > 0) {
      callback({
        code: 1,
        info: '匹配成功'
      })
    } else {
      callback({
        code: 0,
        info: '匹配失败'
      })
    }
  })
}
