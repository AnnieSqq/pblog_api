// 后台文章
const article = require('express').Router()
// 获取文章列表
article.get('/', require('./article/list'))
// 新建文章
article.post('/', require('./article/create'))
// 更新文章
article.put('/', require('./article/update'))
// 删除
article.delete('/', require('./article/delete'))
// 通过id获取文章内容
article.get('/:id', require('./article/findArticleById'))
module.exports = article
