const { Article } = require(Gapi.paths.model + 'Article')

module.exports = (req, res) => {
  req.fields.ids.forEach(async (id) => {
    let article = await Article.findByIdAndDelete(id)
    if (!article) {
      return res.send({
        code: '400',
        msg: '删除文章时发生错误'
      })
    }
  })
  res.send({
    code: '200',
    msg: '删除文章成功'
  })
}
