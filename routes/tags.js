var express = require('express')
var { category, knowledge, list, add, delTag } = require('../controllers/tags')
var router = express.Router()

//获取标签的type、gategory
router.get('/:type/:category', category)

//获取学习文章和学习视频的tag
router.get('/knowledge', knowledge)

router.get('/list', list)

router.post('/', add)

router.delete('/', delTag)

module.exports = router
