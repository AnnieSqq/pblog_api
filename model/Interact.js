const mongoose = require('mongoose')
const { Schema } = mongoose
const Joi = require('joi')
// 定义模型规则
const InteractSchema = new Schema({
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor'
  },
  action: String,
  msg: String,
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interact'
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})
// 创建模型
const Interact = mongoose.model('Interact', InteractSchema)
// 创建验证规则
const validateInteract = (interact) => {
  // id正则式
  const objIdReg = Gapi.regs.objId
  const schema = {
    article: Joi.string().regex(objIdReg).error(new Error('文章id不合规')),
    visitor: Joi.string()
      .regex(objIdReg)
      .required()
      .error(new Error('游客id不合规')),
    action: Joi.string()
      .valid(['like', 'comment', 'collect', 'read', 'leaveword'])
      .error(new Error('互动行为不合规')),
    reply: Joi.string().regex(objIdReg).error(new Error('回复id不合规'))
  }
  // 校验
  return Joi.validate(interact, schema, {
    // 允许对象包含被忽略的未知键
    allowUnknown: true,
    // 检测到所有错误
    abortEarly: false
  })
}
// 导出
module.exports = {
  Interact,
  validateInteract
}
