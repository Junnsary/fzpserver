var express = require('express')
const { list, add, isCollect } = require('../controllers/collection')
var router = express.Router()

//获取收藏列表
router.get('/', list)

//添加收藏
router.post('/', add)

//查看用户否有收藏
router.get('/iscollect', isCollect)

module.exports = router
