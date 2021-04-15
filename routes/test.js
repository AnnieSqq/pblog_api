// 创建路由
const test = require('express').Router()
// 获取一些数据
test.post('/', async (req, res) => {
  const { Category, validateCategory } = require('../model/Category')
  // 创建文章
  const cate = {
    label: '今天过年啦',
    // father: '123456123456123456123456'
    father: '6027adf813c16d367ca717c0'
  }
  category = new Category(cate)
  const { error } = validateCategory(cate)
  console.log(cate)
  if (error) {
    return res.status(400).send({ msg: error.message })
  }
  await category.save()
  console.log(req.query)
  console.log(req.fields)
  res.send({
    data: category
  })
})
// 导出路由
module.exports = test
