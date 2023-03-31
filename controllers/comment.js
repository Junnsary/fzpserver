const commentModel = require('../models/comment')

const list = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { sourceid, tagid } = req.query
    const result = await commentModel.list(sourceid, tagid)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const add = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { userid, sourceid, tagid, content } = req.body

    const result = await commentModel.add(sourceid, tagid, userid, content)

    console.log(result)

    if (result.affectedRows) {
        res.render('succ', {
            data: JSON.stringify({
                message: '添加评论成功。',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '添加评论失败。',
            }),
        })
    }
}

module.exports = {
    list,
    add,
}
