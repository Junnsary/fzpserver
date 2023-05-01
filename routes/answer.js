var express = require('express')
var { list, addAnswer } = require('../controllers/answer')
var router = express.Router()

//user - 获取回答
router.get('/', list)

//user - 添加回答
router.post('/', addAnswer)

module.exports = router
