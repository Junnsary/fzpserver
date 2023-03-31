const favoritesModel = require('../models/favorites')

const list = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { userid } = req.query

    const result = await favoritesModel.list(userid)
    // console.log(req.query.articletype)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const add = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { userid, sourceid, tagid } = req.body

    const result = await favoritesModel.add(sourceid, tagid, userid)

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
    const result = await favoritesModel.cancel(sourceid, tagid, userid)
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

const isFavorites = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { sourceid, tagid, userid } = req.query
    const result = await favoritesModel.isFavorites(sourceid, tagid, userid)
    console.log(result)
    res.render('succ', {
        data: result,
    })
}

module.exports = {
    list,
    add,
    isFavorites,
    cancel,
}
