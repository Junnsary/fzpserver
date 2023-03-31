var express = require('express')
var { list, add } = require('../controllers/comment')
var router = express.Router()

//获取评论列表
router.get('/', list)

router.post('/', add)

module.exports = router
