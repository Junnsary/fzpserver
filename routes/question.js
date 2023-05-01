const express = require('express')
const {
    askQuestion,
    questionList,
    adminall,
    review,
    deleteQuestion,
} = require('../controllers/question')
const router = express.Router()

//user - 用户提问
router.post('/', askQuestion)

router.get('/', questionList)

router.get('/adminall', adminall)

router.post('/review', review)

router.delete('/', deleteQuestion)

module.exports = router
