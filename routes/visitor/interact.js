const interact = require('express').Router()
// 点赞/取消赞
interact.post('/like', require('./interact/like'))
// 评论
interact.post('/comment', require('./interact/comment'))
// 删除评论
interact.delete('/comment', require('./interact/commentDelete'))
// 收藏/取消收藏
interact.post('/collect', require('./interact/collect'))
module.exports = interact
