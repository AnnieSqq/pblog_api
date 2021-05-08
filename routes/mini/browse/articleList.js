const { Article } = require(Gapi.paths.model + 'Article')
const { Category } = require(Gapi.paths.model + 'Category')
//导入分页模块
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
  const reg = new RegExp(req.query.content, 'i')
  let query = {
    $or: [{ content: { $regex: reg } }, { title: { $regex: reg } }]
  }
  const page = req.query.page || 1
  const size = req.query.size || 8
  //   获取文章列表
  const data = await pagination(Article)
    .find(query)
    .sort('-createAt')
    .page(page)
    .size(size)
    .display(5)
    .exec()
  // 文章列表格式化
  const articles = data.records.map((article) => {
    return {
      id: article._id,
      title: article.title,
      release_time: article.createAt,
      reader_num: article.reader_num,
      like_num: article.like_num,
      comment_num: article.comment_num,
      collect_num: article.collect_num,
      word_count: article.word_count,
      category_id: article.category
    }
  })
  //   分别获取每个文章的分类名称
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]
    const category = await Category.findById(article.category_id)
    article.category_name = category.label
  }

  res.send({
    code: '200',
    msg: '获取文章列表成功',
    data: articles,
    page: data.page,
    size: data.size,
    total: data.total,
    pages: data.pages
  })
}
