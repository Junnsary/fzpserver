const express = require('express')
const topicType = require('../controllers/topic_type')
const router = express.Router()

router.get('/', topicType.getType)

router.post('/', topicType.add)

router.delete('/', topicType.del)

module.exports = router
