const read = require('express').Router()
// 根据文章id获取评论
read.get('/comments', require('./read/getComments'))
module.exports = read
