var express = require('express')
var { list, recommendation, quantity } = require('../controllers/sources')
var router = express.Router()

//获取评论列表
router.get('/:type/:tagid', list)

router.get('/recommendation', recommendation)

router.get('/quantity', quantity)

module.exports = router
