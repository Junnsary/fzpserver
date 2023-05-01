const topicTypeModel = require('../models/topic_type.js')

exports.getType = async (req, res) => {
    res.header('content-type', 'application/json; charset=UTF-8')

    const result = await topicTypeModel.getType()

    res.render('succ', {
        data: JSON.stringify(result),
    })
}

exports.add = async (req, res) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { name, describe } = req.body
    const result = await topicTypeModel.add(name, describe)
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

exports.del = async (req, res) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { id } = req.body
    const result = await topicTypeModel.del(id)
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
