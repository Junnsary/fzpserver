const collectionModel = require('../models/collection')

const list = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { userid, type } = req.query
    // console.log(userid, type)
    // console.log(userid, collecttype)
    const result = await collectionModel.list(userid, type)
    console.log(result)
    // console.log(req.query.articletype)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const add = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { userid, sourceid, tagid } = req.body

    const result = await collectionModel.add(sourceid, tagid, userid)

    console.log(result)

    if (result.affectedRows) {
        res.render('succ', {
            data: JSON.stringify({
                message: '添加收藏成功。',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '添加收藏失败。',
            }),
        })
    }
}

const cancel = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { userid, sourceid, tagid } = req.body
    console.log(req.body)
    const result = await collectionModel.cancel(sourceid, tagid, userid)
    console.log(result)
    if (result.affectedRows) {
        res.render('succ', {
            data: JSON.stringify({
                message: '取消收藏成功。',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '取消收藏失败。',
            }),
        })
    }
}

const isCollect = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { sourceid, tagid, userid } = req.query
    // console.log(userid, type)
    // console.log(userid, collecttype)
    const result = await collectionModel.isCollect(sourceid, tagid, userid)
    console.log(result)
    // console.log(req.query.articletype)
    res.render('succ', {
        data: result,
    })
}

module.exports = {
    list,
    add,
    isCollect,
    cancel,
}
