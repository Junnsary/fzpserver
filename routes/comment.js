var express = require('express')
var { list, add } = require('../controllers/comment')
var router = express.Router()

//user - 获取评论列表
router.get('/', list)

//user - 添加评论
router.post('/', add)

module.exports = router
