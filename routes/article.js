var express = require('express')
var {
    list,
    article,
    allCase,
    articlePicture,
    postArticle,
    allArticle,
} = require('../controllers/article')
var router = express.Router()
const path = require('path')
const uploadImagerMiddleware = require('../middlewares/uploadImage')
// const multer = require('multer')
// const upload = multer({ dest: path.resolve(__dirname, '../public/uploads/images/') })

//获取文章列表
router.get('/', list)

//获取案件所有类型和所有类型下的数据
router.get('/allcase', allCase)

//获取单篇文章内容
router.get('/:id(\\d+)', article)

//上面文章中的图片
router.post('/articlepicture', uploadImagerMiddleware('articlepicture'), articlePicture)

//发布文章
router.post('/postarticle', uploadImagerMiddleware('cover'), postArticle)

//所有文章
router.get('/allarticle', allArticle)

module.exports = router
