var express = require('express')
var { list, add } = require('../controllers/collection')
var router = express.Router()

//获取收藏列表
router.get('/', list)

//添加收藏
router.post('/', add)

module.exports = router
