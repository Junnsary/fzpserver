var express = require('express')
var {
    list,
    article,
    articlePicture,
    postArticle,
    allArticle,
    delArticle,
} = require('../controllers/article')
var router = express.Router()
const path = require('path')
const uploadImagerMiddleware = require('../middlewares/uploadImage')
// const multer = require('multer')
// const upload = multer({ dest: path.resolve(__dirname, '../public/uploads/images/') })


//user - 获取单篇文章内容
router.get('/:id(\\d+)', article)

//admin - 在文章中添加图片
router.post('/articlepicture', uploadImagerMiddleware('articlepicture'), articlePicture)

//admin - 发布新的文章
router.post('/postarticle', uploadImagerMiddleware('cover'), postArticle)

//admin - 所有文章
router.get('/all', allArticle)

//admin - 删除一篇文章
router.delete('/:id', delArticle)

module.exports = router
