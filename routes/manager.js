const express = require('express')
const { passwd, login } = require('../controllers/manager')
const router = express.Router()

router.post('/passwd', passwd)

router.post('/login', login)

module.exports = router
