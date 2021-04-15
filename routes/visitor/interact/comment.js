// 评论
const { Interact, validateInteract } = require(Gapi.paths.model + 'Interact')
module.exports = async (req, res) => {
  // 交互中的文章id必须有，或者行为是留言
  if (
    !(req.fields.action == 'comment' && req.fields.article) &&
    req.fields.action !== 'leaveword'
  ) {
    return res.send({
      code: '400',
      msg: '行为参数错误'
    })
  }
  const { error } = validateInteract(req.fields)
  if (error) {
    return res.send({
      code: '400',
      msg: error.message
    })
  }
  let action, msg
  if (req.fields.article) {
    action = 'comment'
    msg = '评论'
  } else {
    action = 'leaveword'
    msg = '留言'
  }
  // 创建评论
  const comment = new Interact({
    article: req.fields.article,
    visitor: req.fields.visitor,
    action,
    msg: req.fields.content,
    reply: req.fields.reply
  })
  await comment.save()
  res.send({
    code: '200',
    msg: '添加' + msg + '成功',
    data: comment
  })
}
