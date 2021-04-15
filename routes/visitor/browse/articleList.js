const { Article } = require(Gapi.paths.model + 'Article')
const { Category } = require(Gapi.paths.model + 'Category')
module.exports = async (req, res) => {
  const categories = (await Category.find()).map((category) => {
    return {
      id: category._id,
      category: category.label
    }
  })
  for (let i = 0; i < categories.length; ++i) {
    const articles = (await Article.find({ category: categories[i].id })).map(
      (article) => {
        return {
          id: article._id,
          title: article.title,
          release_time: article.createAt
        }
      }
    )
    categories[i].data = articles
  }
  res.send({
    code: '200',
    msg: '获取文章列表成功',
    data: categories
  })
}
