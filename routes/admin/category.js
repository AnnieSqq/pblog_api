// 后台分类
const category = require('express').Router()
// 分类列表
category.get('/', require('./category/list'))
// 创建分类
category.post('/', require('./category/create'))
// 删除分类
category.delete('/', require('./category/delete'))
// 更新分类
category.put('/', require('./category/update'))
module.exports = category
