const articleModel = require('../models/article')
const monent = require('moment')
/* 
接受type， tag
type的是文章的类型（知识，案件）
tag的文章的标签分类
tag如果为空，就显示该类型文章的全部
*/
const list = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { tagid } = req.query
    console.log(tagid)
    try {
        const result = await articleModel.list(tagid)
        res.render('succ', {
            data: JSON.stringify(result),
        })
    } catch (e) {
        res.render('fail', {
            data: JSON.stringify({
                message: '查询文章列表失败。',
            }),
        })
    }
}

const article = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { id } = req.params
    // console.log(req.params.id)
    const find = await articleModel.findArticle(id)
    if (find.length > 0) {
        const result = await articleModel.article(id)
        if (result) {
            res.header('content-type', 'text/html; charset=UTF-8')
            // console.log(result)
            const title = result.title
            const createtime = monent(result.created_at).format('YYYY-MM-DD HH:mm:ss')
            const name = result.manager.name
            const content = result.content

            res.render('article-view', {
                title: title,
                createtime: createtime,
                name: name,
                content: content,
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '查询文章出错。',
                }),
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '未找到文章。',
            }),
        })
    }
}

module.exports = {
    list,
    article,
}
