// 全局js
// 引入文件路径处理函数
const path = require('path')
global.Gapi = {
  paths: {
    // 模型
    model: path.join(__dirname, 'model', '/'),
    // 静态资源
    public: path.join(__dirname, 'public', '/'),
    // 全局函数
    utils: path.join(__dirname, 'utils', '/')
  },
  regs: {
    email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
    phone: /^[a-zA-Z0-9]{3,30}$/,
    objId: /^[0-9a-fA-F]{24}$/
  }
}
