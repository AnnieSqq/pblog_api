const mongoose = require('mongoose')
const { Schema } = mongoose
const Joi = require('joi')
// 定义模型
const VisitorSchema = new Schema({
  token: String,
  name: String
})
// 创建模型
const Visitor = mongoose.model('Visitor', VisitorSchema)
// 格式校验
const validateVisitor = (category) => {
  // 定义校验规则
  const schema = {
    token: Joi.string().required().error(new Error('token格式不对')),
    name: Joi.string().min(1).required().error(new Error('游客name不合规'))
  }
  // 校验
  return Joi.validate(category, schema, {
    // 允许对象包含被忽略的未知键
    allowUnknown: true,
    // 检测到所有错误
    abortEarly: false
  })
}
// 导出
module.exports = {
  Visitor,
  validateVisitor
}
