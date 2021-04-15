const adminInfo = require('express').Router()
adminInfo.get('/', (req, res) => {
  if (req.headers.admintoken === '123456789') {
    res.send({
      code: '200',
      data: {
        id: '12345678910',
        username: 'admin',
        nickname: '小青纸',
        token: '123456789'
      },
      msg: '获取管理员信息成功'
    })
  } else {
    res.send({
      code: '400',
      msg: 'token不合规'
    })
  }
})
module.exports = adminInfo
