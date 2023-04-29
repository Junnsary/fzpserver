var express = require('express')
var { login, signup } = require('../controllers/users')
var router = express.Router()

//user - 用户注册
router.post('/signup', signup)

//user - 用户登录
router.post('/login', login)

module.exports = router
