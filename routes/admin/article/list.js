const { Article } = require(Gapi.paths.model + 'Article')
module.exports = async (req, res) => {
  const articles = (await Article.find()).map((article) => {
    return {
      id: article._id,
      title: article.title,
      release_time: article.createAt
      // category: article.category
    }
  })
  // console.log(articles)
  return res.send({ code: '200', msg: '获取文章成功', data: articles })
}
