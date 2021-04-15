const login = require('express').Router()
login.post('/', (req, res) => {
  console.log(req.fields)
  if (req.fields.username === 'admin' && req.fields.password === 'admin') {
    res.send({
      code: '200',
      data: {
        id: '12345678910',
        username: 'admin',
        nickname: '小青纸',
        token: '123456789'
      },
      msg: '管理员登录成功'
    })
  } else {
    res.send({
      code: '400',
      msg: '用户名或密码错误'
    })
  }
})
module.exports = login
