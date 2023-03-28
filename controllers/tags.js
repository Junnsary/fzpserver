const tagsModel = require('../models/tags')

//获取指定的type下的category的所有标签
const category = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { type, category } = req.params
    const tagResult = await tagsModel.findCategory(type, category)
    if (tagResult) {
        res.render('succ', {
            data: JSON.stringify(tagResult),
        })
    } else {
        res.render('fail', {
            data: '',
        })
    }
}

const knowledge = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const result = await tagsModel.knowledge()
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

module.exports = {
    category,
    knowledge,
}
