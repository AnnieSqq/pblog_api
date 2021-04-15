module.exports = (app) => {
  // 拦截器
  // 拦截游客的交互请求
  app.all('/visitor/interact/*', (req, res, next) => {
    // 如果token与id比对失败
    if (req.fields.visitor !== req.headers.visitortoken) {
      return res.send({
        code: '300',
        msg: '游客id状态有误'
      })
    }
    next()
  })

  // 测试
  app.use('/test', require('./test.js'))

  // 后台
  // 登录
  app.use('/admin/login',require('./admin/login.js'))
  // 获取管理员信息
  app.use('/admin/info',require('./admin/adminInfo.js'))
  // 文章模块
  app.use('/admin/article', require('./admin/article.js'))
  // 文章分类模块
  app.use('/admin/category', require('./admin/category.js'))

  // 前台
  // 浏览页面模块
  app.use('/visitor/browse', require('./visitor/browse.js'))
  // 游客账户模块
  app.use('/visitor/user', require('./visitor/user.js'))
  // 游客行为模块
  app.use('/visitor/interact', require('./visitor/interact.js'))
  // 阅读页面模块
  app.use('/visitor/read', require('./visitor/read.js'))
}
