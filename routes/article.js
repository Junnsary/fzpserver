var express = require('express')
var { list, article } = require('../controllers/article')
var router = express.Router()

//获取文章列表
router.get('/', list)

//获取单篇文章内容
router.get('/:id', article)

module.exports = router
