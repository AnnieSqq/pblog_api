// 新建文章
const { Article, validateArticle } = require(Gapi.paths.model + 'Article')
module.exports = async (req, res) => {
  // 验证请求参数
  const { error } = validateArticle(req.fields)
  if (error) {
    return res.send({
      code: '400',
      msg: error.message
    })
  }
  // 创建文章对象
  const article = new Article(req.fields)
  // 保存文章到数据库
  await article.save()
  // 响应
  res.send({
    code: '200',
    msg: '创建文章成功',
    data: {
      id: article._id,
      title: article.title,
      release_time: article.createAt,
      content: article.content,
      category: article.category
    }
  })
}
