var express = require('express')
var topicControllers = require('../controllers/topic')
var router = express.Router()

router.post('/', topicControllers.add)

router.get('/', topicControllers.list)

router.delete('/', topicControllers.delTopic)

module.exports = router
