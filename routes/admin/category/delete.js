const { Category } = require(Gapi.paths.model + 'Category')
const { Article } = require(Gapi.paths.model + 'Article')
module.exports = async (req, res) => {
  // 获取默认分类
  let defaultCategory = await Category.findOne()
  req.fields.ids.forEach(async (id) => {
    let category = await Category.findByIdAndDelete(id)
    if (!category) {
      return res.send({
        code: '400',
        msg: '删除分类时出错'
      })
    }
    // 删完分类之后，将归属于该分类的文章分类挪动到默认分类
    await Article.updateMany(
      { category: id },
      { $set: { category: defaultCategory } }
    )
  })
  res.send({
    code: '200',
    msg: '删除分类成功'
  })
}
