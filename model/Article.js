// 引入数据库
const mongoose = require('mongoose')
// 引入schema构造
const { Schema } = mongoose
// 引入对象验证规则
const Joi = require('joi')
// 建立模型
const ArticleSchema = new Schema({
  // 文章标题
  title: {
    type: String,
    required: true
  },
  // 文章内容
  content: {
    type: String,
    defualt: null
  },
  // 所属分类
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
})
// 创建模型
const Article = mongoose.model('Article', ArticleSchema)
// 格式校验
const validateArticle = (article) => {
  // 对象验证规则
  const schema = {
    // 文章标题不为空
    title: Joi.string().min(1).required().error(new Error('文章标题不合规')),
    // 所属分类id不为空
    category: Joi.string()
      .regex(Gapi.regs.objId)
      .required()
      .error(new Error('分类id非法'))
  }
  // 验证
  return Joi.validate(article, schema, {
    // 允许对象包含被忽略的未知键
    allowUnknown: true,
    // 检测到所有错误
    abortEarly: false
  })
}
// 导出模块成员
module.exports = {
  Article,
  validateArticle
}
