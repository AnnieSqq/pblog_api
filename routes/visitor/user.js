const user = require('express').Router()
user.post('/register', require('./user/register'))
user.get('/info', require('./user/getVisitorByToken'))
module.exports = user
