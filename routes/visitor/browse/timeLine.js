const { Article } = require(Gapi.paths.model + 'Article')
module.exports = async (req, res) => {
  const articles = (await Article.find()).reverse().map((article) => {
    return {
      id: article._id,
      title: article.title,
      release_time: article.createAt
    }
  })
  res.send({
    code: '200',
    data: articles,
    msg: '获取文章归档成功'
  })
}
