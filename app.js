const express = require('express')
const app = express()
const mongoose = require('mongoose')
// formidable模块
const formidable = require('express-formidable')
// 跨域中间件
const cors = require('cors')
// 加载全局js
require('./global.js')
// 连接数据库
mongoose
  .connect('mongodb://sqq:123.com@localhost:27017/pblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('数据库连接成功'))
  .catch(() => console.log('数据库连接失败'))
// 开放跨域请求
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    alloweHeaders: [
      'Content-Type',
      'application/json;charset=utf-8;application/x-www-form-urlencoded'
    ]
  })
)
// 开放静态资源
app.use(express.static(Gapi.paths.public))
// 使用formidable处理请求参数
app.use(formidable())

// 拦截游客的交互请求
// app.all('/visitor/interact/*', (req, res, next) => {
//   console.log(req.fields)
//   // 如果token与id比对失败
//   if (req.fields.visitor !== req.headers.visitortoken) {
//     return res.send({
//       code: '300',
//       msg: '游客id状态有误'
//     })
//   }
//   // 交互中的文章id必须有
//   if (!req.fields.article) {
//     return res.send({
//       code: '400',
//       msg: '文章id不合规'
//     })
//   }
//   next()
// })
// 路由
require('./routes')(app)
// 启动服务器
app.listen(3000, () => {
  console.log('监听3000端口...')
})
