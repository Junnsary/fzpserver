const commentModel = require('../models/comment')

const list = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { sourceid, tagid } = req.query
    const result = await commentModel.list(sourceid, tagid)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

module.exports = {
    list,
}
