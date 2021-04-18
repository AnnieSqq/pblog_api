// 根据文章id获取评论
const { Interact } = require(Gapi.paths.model + 'Interact')
const { Visitor } = require(Gapi.paths.model + 'Visitor')
//导入分页模块
const pagination = require('mongoose-sex-page')
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
  //查询评论
  //page：指定当前页
  //size：指定每页要显示的数据条数
  //display：指定客户端要显示的页码数量
  //接收客户端传递过来的页码
  const page = req.query.page || 1
  const data = await pagination(Interact)
    .find({
      action: req.query.action,
      article: req.query.article ? req.query.article : undefined,
      isDeleted: false
    })
    .page(page)
    .size(10)
    .display(5)
    .exec()
  const comments = []
  // 在map或者forEach函数体中执行异步操作的话返回回来的总是Promise，不好搞哦
  for (let i = 0; i < data.records.length; ++i) {
    let comment = data.records[i]
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
    data: {
      page: data.page,
      size: data.size,
      total: data.total,
      pages: data.pages,
      display: data.display,
      comments
    }
  })
}
