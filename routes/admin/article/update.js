const { Article, validateArticle } = require(Gapi.paths.model + 'Article')
// 更新文章
module.exports = async (req, res) => {
  // 验证
  const { error } = validateArticle(req.fields)
  if (error) {
    return res.send({ msg: error.message })
  }
  // 更新
  let article = await Article.findByIdAndUpdate(
    req.fields.id,
    { $set: req.fields },
    { new: true }
  )
  // 如果更新不成功
  if (!article) {
    return res.send({
      code: '400',
      msg: '没找到对应id的文章'
    })
  }
  // 响应
  res.send({
    code: '200',
    msg: '更新文章成功',
    data: {
      id: article._id,
      title: article.title,
      content: article.content,
      category: article.category
    }
  })
}
