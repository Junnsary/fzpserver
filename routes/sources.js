var express = require('express')
var { list, recommendation } = require('../controllers/sources')
var router = express.Router()

//获取评论列表
router.get('/:type/:tagid', list)

router.get('/recommendation', recommendation)

module.exports = router
