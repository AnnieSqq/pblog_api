const { Category } = require(Gapi.paths.model + 'Category')
module.exports = async (req, res) => {
  const categories = (await Category.find()).map((category) => {
    return {
      id: category._id,
      label: category.label
    }
  })
  res.send({
    code: '200',
    msg: '获取分类列表成功',
    data: categories
  })
}
