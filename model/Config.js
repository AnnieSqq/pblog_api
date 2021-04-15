const mongoose = require('mongoose')
const { Schema } = mongoose
const Joi = require('joi')
// 定义模型规则
const ConfigSchema = new Schema({
  name: String,
  value: String,
  type: String
})
// 创建模型
const Config = mongoose.model('Config', ConfigSchema)
// 格式校验
const validateConfig = (config) => {
  // 定义校验规则
  const schema = {
    name: Joi.string().min(1).required().error(new Error('配置名不合规')),
    value: Joi.string().min(1).required().error(new Error('配置值不合规')),
    type: Joi.string()
      .valid(['visitor', 'admin'])
      .required()
      .error(new Error('配置种类不合规'))
  }
  // 校验
  return Joi.validate(config, schema, {
    // 允许对象包含被忽略的未知键
    allowUnknown: true,
    // 检测到所有错误
    abortEarly: false
  })
}
// 导出
module.exports = {
  Config,
  validateConfig
}
