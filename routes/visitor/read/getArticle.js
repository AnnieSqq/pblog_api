// 根据id获取文章信息，公共函数
const { Article } = require(Gapi.paths.model + 'Article')
const Joi = require('joi')
module.exports = async (req, res) => {
  // 验证id是否合法
  const { error } = Joi.validate(req.params, {
    id: Joi.string()
      .regex(Gapi.regs.objId)
      .required()
      .error(new Error('文章id不合规'))
  })
  if (error) {
    return res.send({
      code: '400',
      msg: error.message
    })
  }
  const article = await Article.findById(req.params.id)
  if (!article) {
    return res.send({
      code: '400',
      msg: '查询失败'
    })
  }
  // 查询成功，看过人次加一
  await Article.findByIdAndUpdate(req.params.id, { $inc: { reader_num: 1 } })
  res.send({
    code: '200',
    msg: '查询成功',
    data: {
      id: article._id,
      title: article.title,
      content: article.content,
      // 分类的id
      category: article.category
    }
  })
}
