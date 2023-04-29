var express = require('express')
var { list, recommendation, quantity, search } = require('../controllers/sources')
var router = express.Router()

//user - 文章或者视频下获取评论列表
router.get('/:type/:tagid', list)

//user - 获取的学习文章的推荐列表
router.get('/recommendation', recommendation)

//user - 搜索文章和视频
router.get('/search', search)

//admin - 查看注册用户、发布视频、发布文章的数量
router.get('/quantity', quantity)



module.exports = router
