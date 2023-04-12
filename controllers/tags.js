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

const list = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { category, type } = req.query
    const result = await tagsModel.list(category, type)

    console.log(category, type)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const add = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { category, type, name } = req.body
    console.log(req.body)
    const result = await tagsModel.add(category, type, name)
    console.log(result)
    if (result.affectedRows) {
        res.render('succ', {
            data: JSON.stringify({
                message: '添加成功！',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '添加失败！',
            }),
        })
    }
}

const delTag = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { id } = req.body
    console.log(req.body)
    const result = await tagsModel.delTag(id)
    // console.log(result)
    if (result.affectedRows) {
        res.render('succ', {
            data: JSON.stringify({
                message: '删除成功！',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '删除失败！',
            }),
        })
    }
}

module.exports = {
    category,
    knowledge,
    list,
    add,
    delTag,
}
