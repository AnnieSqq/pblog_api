// 收藏/取消收藏
const { Interact, validateInteract } = require(Gapi.paths.model + 'Interact')
const { Article } = require(Gapi.paths.model + 'Article')
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
  // 首先查找这个收藏项是否存在
  let collect = await Interact.findOne({
    article: req.fields.article,
    visitor: req.fields.visitor,
    action: 'collect'
  })
  // 如果存在就更新
  if (collect) {
    let id = collect._id
    collect = await Interact.findByIdAndUpdate(
      id,
      { $set: { isDeleted: !collect.isDeleted } },
      { new: true }
    )
    // 更新文章信息统计
    await updateArticle(req.fields.article)
    return res.send({
      code: '200',
      msg: collect.isDeleted ? '取消收藏成功' : '收藏成功'
    })
  }
  // 如果不存在，就创建收藏
  collect = new Interact({
    article: req.fields.article,
    visitor: req.fields.visitor,
    action: 'collect'
  })
  await collect.save()
  // 更新文章信息统计
  await updateArticle(req.fields.article)
  res.send({
    code: '200',
    msg: '收藏成功'
  })
}
/**
 * 更新文章信息统计
 * @param {String} article  文章id
 */
async function updateArticle(article) {
  const collect_num = (
    await Interact.find({
      action: 'collect',
      isDeleted: false,
      article: article
    })
  ).length
  await Article.findByIdAndUpdate(article, {
    $set: { collect_num }
  })
}
