var express = require('express')
var { list, video } = require('../controllers/video')
var router = express.Router()

//获取视频的列表
router.get('/', list)

//获取单个视频
router.get('/:id', video)

module.exports = router
