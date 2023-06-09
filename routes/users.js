var express = require('express')
var { login, signup, editUser } = require('../controllers/users')
const uploadImagerMiddleware = require('../middlewares/uploadImage')
var router = express.Router()

//user - 用户注册
router.post('/signup', signup)

//user - 用户登录
router.post('/login', login)

//修改信息
router.post('/edit', uploadImagerMiddleware('avatar'),  editUser)

module.exports = router
