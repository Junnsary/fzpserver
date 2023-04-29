var express = require('express')
const { list, add, isFavorites, cancel } = require('../controllers/favorites')
var router = express.Router()

//user - 通过userId获取收藏列表
router.get('/', list)

//user - 添加收藏
router.post('/', add)

//user - 取消收藏
router.post('/cancel', cancel)

//user - 查看用户否有收藏
router.get('/isfavorites', isFavorites)

module.exports = router
