const mongoose = require('mongoose')
const { Schema } = mongoose
const Joi = require('joi')
// 建立模型
const CategorySchema = new Schema({
  // 分类名称
  label: String,
  // 父分类id
  father: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})
// 创建模型
const Category = mongoose.model('Category', CategorySchema)
// 格式检验
const validateCategory = (category) => {
  // 定义校验规则
  const schema = {
    // 分类名不为空
    label: Joi.string().min(1).required().error(new Error('分类名不合规')),
    // 父级分类id规则
    father: Joi.string().regex(Gapi.regs.objId)
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
  Category,
  validateCategory
}
