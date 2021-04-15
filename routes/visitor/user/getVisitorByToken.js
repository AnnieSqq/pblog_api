const { Visitor } = require(Gapi.paths.model + 'Visitor')
module.exports = async (req, res) => {
  const visitor = await Visitor.findOne({ token: req.headers.visitortoken })
  if (!visitor) {
    return res.send({
      code: '200',
      msg: '根据token获取游客信息失败'
    })
  }
  res.send({
    code: '200',
    msg: '获取游客信息成功',
    data: {
      id: visitor._id,
      name: visitor.name
    }
  })
}
