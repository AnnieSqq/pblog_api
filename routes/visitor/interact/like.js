// 点赞/取消赞
const { Interact, validateInteract } = require(Gapi.paths.model + 'Interact')
module.exports = async (req, res) => {
  // 交互中的文章id必须有
  if (!req.fields.article) {
    return res.send({
      code: '400',
      msg: '文章id不合规'
    })
  }
  const { error } = validateInteract(req.fields)
  if (error) {
    return res.send({
      code: '400',
      msg: error.message
    })
  }
  console.log({
    article: req.fields.article,
    visitor: req.fields.visitor,
    action: 'like'
  })
  // 首先查找这个点赞项是否存在
  let like = await Interact.findOne({
    article: req.fields.article,
    visitor: req.fields.visitor,
    action: 'like'
  })
  // 如果存在就更新
  if (like) {
    let id = like._id
    like = await Interact.findByIdAndUpdate(
      id,
      { $set: { isDeleted: !like.isDeleted } },
      { new: true }
    )
    return res.send({
      code: '200',
      msg: like.isDeleted ? '取消赞成功' : '点赞成功'
    })
  }
  // 如果不存在，就创建点赞
  like = new Interact({
    article: req.fields.article,
    visitor: req.fields.visitor,
    action: 'like'
  })
  await like.save()
  res.send({
    code: '200',
    msg: '点赞成功'
  })
}
