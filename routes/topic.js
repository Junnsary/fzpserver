var express = require('express')
var topicControllers = require('../controllers/topic')
var router = express.Router()

router.post('/', topicControllers.add)

router.get('/', topicControllers.list)

router.delete('/', topicControllers.delTopic)

router.get('/topictest', topicControllers.topicTest)

router.get('/starttest', topicControllers.startTest)

module.exports = router
