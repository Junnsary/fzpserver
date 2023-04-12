var express = require('express')
var { list, video, postVideo, allVideo, delVideo } = require('../controllers/video')
var router = express.Router()
const uploadImagerMiddleware = require('../middlewares/uploadImage')
const uploadVideoMiddleware = require('../middlewares/uploadVideo')

//获取视频的列表
router.get('/', list)

//获取单个视频
router.get('/:id(\\d+)', video)

router.post(
    '/',
    uploadVideoMiddleware([
        { name: 'cover', maxCount: 1 },
        { name: 'video', maxCount: 1 },
    ]),
    postVideo
)

router.get('/all', allVideo)

router.delete('/:id', delVideo)

module.exports = router
