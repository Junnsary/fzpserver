var express = require('express')
var { list, video, postVideo, allVideo, delVideo } = require('../controllers/video')
var router = express.Router()
const uploadImagerMiddleware = require('../middlewares/uploadImage')
const uploadVideoMiddleware = require('../middlewares/uploadVideo')

//user - 获取单个视频(视频里保存的信息，如视频文件名，封面文件名)
router.get('/:id(\\d+)', video)

//admin - 发布视频
router.post(
    '/',
    uploadVideoMiddleware([
        { name: 'cover', maxCount: 1 },
        { name: 'video', maxCount: 1 },
    ]),
    postVideo
)

//admin - 获取所有视频
router.get('/all', allVideo)

//admin - 删除单个视频
router.delete('/:id', delVideo)

module.exports = router
