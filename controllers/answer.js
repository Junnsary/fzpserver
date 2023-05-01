const answerModel = require('../models/answer')

const list = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { questionid } = req.query
    const result = await answerModel.list(questionid)

    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const addAnswer = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { content, questionid, date, userid } = req.body
    const result = await answerModel.addAnswer(content, questionid, date, userid)

    if (result.affectedRows > 0) {
        res.render('succ', {
            data: JSON.stringify({
                message: '成功',
            }),
        })
    } else {
        res.render('fial', {
            data: JSON.stringify({
                message: '失败',
            }),
        })
    }
}

module.exports = {
    list,
    addAnswer,
}
