const { Category, validateCategory } = require(Gapi.paths.model + 'Category')
module.exports = async (req, res) => {
  // 验证
  const { error } = validateCategory(req.fields)
  if (error) {
    res.send({
      code: '400',
      msg: error.msg
    })
  }
  // 创建
  const category = new Category(req.fields)
  await category.save()
  res.send({
    code: '200',
    msg: '创建分类成功',
    data: category
  })
}
