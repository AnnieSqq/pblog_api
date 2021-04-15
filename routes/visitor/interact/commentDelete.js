// 删除评论
const { Interact } = require(Gapi.paths.model + 'Interact')
module.exports = async (req, res) => {
  if(req.fields.visitor!==req.fields.owner){
    return res.send({
      code:'400',
      msg:'只有发布者才能删除哦'
    })
  }
  // const interact = await Interact.findByIdAndDelete(req.fields.id)
  const interact = await Interact.findByIdAndUpdate(
    req.fields.id,
    { $set: { isDeleted: true } },
    { new: true }
  )
  if (!interact) {
    return res.send({
      code: '400',
      msg: '删除失败'
    })
  }
  res.send({
    code: '200',
    msg: '删除成功'
  })
}
