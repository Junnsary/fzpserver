const questionModel = require('../models/question')

const askQuestion = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { userid, content } = req.body
    console.log(userid, content)
    const result = await questionModel.askQuestion(userid, content)

    if (result.affectedRows > 0) {
        res.render('succ', {
            data: JSON.stringify({
                message: '成功',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '失败',
            }),
        })
    }
}

const questionList = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { userid, review } = req.query

    const result = await questionModel.questionList(userid, ~~review)

    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const adminall = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { pagesize, currentpage, review } = req.query
    console.log(pagesize, currentpage, review)
    const result = await questionModel.allQuestion(~~pagesize, ~~currentpage, review)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const review = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { reviewcode, questionid } = req.body
    const result = await questionModel.review(questionid, reviewcode)

    if (result.affectedRows > 0) {
        res.render('succ', {
            data: JSON.stringify({
                message: '成功',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '失败',
            }),
        })
    }
}

const deleteQuestion = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { questionid } = req.body
    const result = await questionModel.deleteQuestion(questionid)

    if (result.affectedRows > 0) {
        res.render('succ', {
            data: JSON.stringify({
                message: '成功',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '失败',
            }),
        })
    }
}

module.exports = {
    askQuestion,
    questionList,
    adminall,
    review,
    deleteQuestion,
}
