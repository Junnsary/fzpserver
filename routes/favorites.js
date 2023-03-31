var express = require('express')
const { list, add, isFavorites, cancel } = require('../controllers/favorites')
var router = express.Router()

//获取收藏列表
router.get('/', list)

//添加收藏
router.post('/', add)

//取消收藏
router.post('/cancel', cancel)

//查看用户否有收藏
router.get('/isfavorites', isFavorites)

module.exports = router
