const userTopicModel = require('../models/user_topic.js')

exports.submitUserTopic = async (req, res) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { topics, userid } = req.body
    // console.log(req.body)
    // console.log(data)
    // console.log(data)
    const userTopicId = await userTopicModel.submitUserTopic(topics, userid)
    if (userTopicId) {
        res.render('succ', {
            data: JSON.stringify(userTopicId),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify(''),
        })
    }
}

exports.userTopicDetail = async (req, res) => {
    res.header('content-type', 'text/html; charset=UTF-8')
    const {usertopicid} = req.query
    res.render('user-topic-detail', {
        usertopicid: JSON.stringify(usertopicid)
    })
}

exports.testResult = async (req, res) => {
    const {usertopicid} = req.query
    const result = await userTopicModel.testResult(usertopicid)
    res.render('succ', {
        data: JSON.stringify(result)
    })
}

exports.userTopicList = async (req, res) => {
    const {userid} = req.query
    const result = await userTopicModel.userTopicList(userid)
    res.render('succ', {
        data: JSON.stringify(result)
    })
}