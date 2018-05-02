import express from 'express'
const route = express.Router()

route.post('/detail', (req, res) => {
res.send('我是详情页面')
})

export default route