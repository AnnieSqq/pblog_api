/**
 * 获取一个随机的name
 */
module.exports.getRandomName = function () {
  const names = [
    '小猪佩奇',
    '猪猪侠',
    '白雪公主',
    '海绵宝宝',
    '派大星',
    '刑天铠甲'
  ]
  return (
    names[Math.floor(Math.random() * names.length)] +
    Math.floor(Math.random() * 1000)
  )
}
