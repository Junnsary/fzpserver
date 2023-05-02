var express = require('express')
var userTopicControllers = require('../controllers/user_topic.js')
var router = express.Router()

const jsonData = (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    next()
}

router.post('/', userTopicControllers.submitUserTopic)

router.get('/detail', userTopicControllers.userTopicDetail)

router.get('/testresult', jsonData, userTopicControllers.testResult)

router.get('/list', jsonData, userTopicControllers.userTopicList)

module.exports = router
