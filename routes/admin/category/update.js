const { validateCategory, Category } = require(Gapi.paths.model + 'Category')
module.exports = async (req, res) => {
  // 验证
  const { error } = validateCategory(req.fields)
  if (error) {
    return res.send({
      code: '400',
      msg: error.message
    })
  }
  const category = await Category.findByIdAndUpdate(
    req.fields.id,
    { $set: req.fields },
    { new: true }
  )
  if (!category) {
    return res.send({
      code: '400',
      msg: '更新分类失败'
    })
  }
  res.send({
    code: '200',
    msg: '更新分类成功',
    data: {
      id: category.id,
      label: category.label
    }
  })
}
