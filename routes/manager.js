const express = require('express')
const { passwd, login } = require('../controllers/manager')
const router = express.Router()

//admin - 修改密码
router.post('/passwd', passwd)

//admin - 管理员登录
router.post('/login', login)

module.exports = router
