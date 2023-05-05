var express = require('express')
var { category, knowledge, list, add, delTag } = require('../controllers/tags')
var router = express.Router()

//user - 获取标签的type、gategory
router.get('/typecategory', category)

//user - 单独获取学习文章和学习视频的tag（为学习界面的 单独学习文章和视频列表的所有tagid）
router.get('/knowledge', knowledge)

//admin - 管理员查看标签信息
router.get('/list', list)

//admin - 管理添加添加标签
router.post('/', add)

//admin - 管理员删除标签
router.delete('/', delTag)

module.exports = router
