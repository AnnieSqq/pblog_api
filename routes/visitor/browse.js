const browse = require('express').Router()
// 获取文章列表
browse.get('/articles', require('./browse/articleList'))
// 获取归档列表
browse.get('/timeline',require('../visitor/browse/timeLine'))
// 获取留言
module.exports = browse
