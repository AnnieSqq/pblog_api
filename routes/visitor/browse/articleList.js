const { Article } = require(Gapi.paths.model + 'Article')
const { Category } = require(Gapi.paths.model + 'Category')
module.exports = async (req, res) => {
  const reg = new RegExp(req.query.content, 'i')
  let query = {
    $or: [{ content: { $regex: reg } }, { title: { $regex: reg } }]
  }
  const categories = (await Category.find()).map((category) => {
    return {
      id: category._id,
      category: category.label
    }
  })
  for (let i = 0; i < categories.length; ++i) {
    query.category = categories[i].id
    const articles = (await Article.find(query)).map((article) => {
      return {
        id: article._id,
        title: article.title,
        release_time: article.createAt,
        reader_num: article.reader_num,
        like_num: article.like_num,
        comment_num: article.comment_num,
        collect_num: article.collect_num,
        word_count: article.word_count
      }
    })
    categories[i].data = articles
  }
  res.send({
    code: '200',
    msg: '获取文章列表成功',
    data: categories
  })
}
