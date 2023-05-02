const { json } = require('express')
const topicTypeModel = require('../models/topic.js')

exports.add = async (req, res) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { title, type, solution } = req.body
    // console.log(title, type, solution)
    const result = await topicTypeModel.add(title, type, solution)
    console.log(result)
    if (result) {
        res.render('succ', {
            data: JSON.stringify(''),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify(''),
        })
    }
}

exports.list = async (req, res) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { pagesize, currentpage } = req.query
    const result = await topicTypeModel.list(~~pagesize, ~~currentpage)
    if (result) {
        res.render('succ', {
            data: JSON.stringify(result),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify(''),
        })
    }
}

exports.delTopic = async (req, res) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { topicid } = req.body
    const result = await topicTypeModel.delTopic(~~topicid)
    if (result) {
        res.render('succ', {
            data: JSON.stringify(''),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify(''),
        })
    }
}

exports.topicTest = async (req, res) => {
    res.header('content-type', 'text/html; charset=UTF-8')
    const { userid } = req.query
    console.log(userid)
    res.render('topic-test', {
        userid: JSON.stringify(userid),
    })
}

exports.startTest = async (req, res) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const result = await topicTypeModel.startTest()
    res.render('succ', {
        data: JSON.stringify(result),
    })
}
