const { Visitor } = require(Gapi.paths.model + 'Visitor')
const { getRandomName } = require(Gapi.paths.utils + 'index.js')
module.exports = async (req, res) => {
  const visitor = new Visitor({ name: getRandomName() })
  visitor.token = visitor._id
  await visitor.save()
  res.send({
    code: '200',
    msg: '生成游客账号成功',
    data: {
      id: visitor._id,
      name: visitor.name,
      token: visitor.token
    }
  })
}
