var express = require('express')
var { list } = require('../controllers/comment')
var router = express.Router()

//获取评论列表
router.get('/', list)

module.exports = router
