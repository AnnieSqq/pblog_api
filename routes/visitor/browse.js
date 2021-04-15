const browse = require('express').Router()
// 获取文章列表
browse.get('/articles', require('./browse/articleList'))
// 获取留言
module.exports = browse
