const browse = require('express').Router()
browse.get('/articles',require('./browse/articleList'))
module.exports = browse