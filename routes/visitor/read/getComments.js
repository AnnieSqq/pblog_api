// 根据文章id获取评论
const { Interact } = require(Gapi.paths.model + 'Interact')
const { Visitor } = require(Gapi.paths.model + 'Visitor')
module.exports = async (req, res) => {
  if (
    !(req.query.action == 'comment' && req.query.article) &&
    req.query.action !== 'leaveword'
  ) {
    return res.send({
      code: '400',
      msg: '获取参数错误'
    })
  }
  const data = await Interact.find(req.query)
  const comments = []
  // 在map或者forEach函数体中执行异步操作的话返回回来的总是Promise，不好搞哦
  // const comments = data.map(async (comment) => {
  //   let visitor = await Visitor.findById(comment.visitor)
  //   const coms = {
  //     id: comment._id,
  //     visitor_name: visitor.name,
  //     content: comment.msg,
  //     release_time: comment.createAt,
  //     reply: comment.reply
  //   }
  //   console.log(coms)
  //   return coms
  // })
  for (let i = 0; i < data.length; ++i) {
    let comment = data[i]
    if (comment.isDeleted) {
      continue
    }
    let visitor = await Visitor.findById(comment.visitor)
    let reply = await Interact.findById(comment.reply)
    let reply_visitor = ''
    if (reply) {
      reply_visitor = await Visitor.findById(reply.visitor)
    }
    comments.push({
      id: comment._id,
      visitor_id: visitor._id,
      visitor_name: visitor.name,
      content: comment.msg,
      release_time: comment.createAt,
      reply: reply
        ? {
            id: reply.id,
            visitor_id: reply.visitor,
            visitor_name: reply_visitor.name,
            content: reply.isDeleted ? '【已删除】' : reply.msg,
            release_time: reply.createAt
          }
        : undefined
    })
  }
  res.send({
    code: '200',
    msg: req.query.action == 'comment' ? '评论获取成功' : '留言获取成功',
    data: comments
  })
}
