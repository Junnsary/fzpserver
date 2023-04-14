const sourcesModel = require('../models/sources')

const list = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { type, tagid } = req.params
    // console.log(type, tagid)
    const result = await sourcesModel.list(type, tagid)
    // console.log(result)
    console.log(result)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const recommendation = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { num } = req.query
    // console.log(num)
    const result = await sourcesModel.recommendation(~~num)
    // console.log(result)
    console.log(result)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const quantity = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const result = await sourcesModel.quantity()
    console.log(result)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

module.exports = {
    list,
    recommendation,
    quantity,
}
