// 删除评论
const { Interact } = require(Gapi.paths.model + 'Interact')
const { Article } = require(Gapi.paths.model + 'Article')
module.exports = async (req, res) => {
  if (req.fields.visitor !== req.fields.owner) {
    return res.send({
      code: '400',
      msg: '只有发布者才能删除哦'
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
  // 更新文章信息统计
  await updateArticle(req.fields.article)
  res.send({
    code: '200',
    msg: '删除成功'
  })
}
/**
 * 更新文章信息统计
 * @param {String} article  文章id
 */
async function updateArticle(article) {
  const comment_num = (
    await Interact.find({
      action: 'comment',
      isDeleted: false,
      article: article
    })
  ).length
  await Article.findByIdAndUpdate(article, {
    $set: { comment_num }
  })
}
