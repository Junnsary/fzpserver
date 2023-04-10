const { render } = require('ejs')
const articleModel = require('../models/article')
const monent = require('moment')
const url = require('url')
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

const allCase = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const result = await articleModel.allCase()
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const articlePicture = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const filePath = req.file.path
    const fileSavePath = filePath.substring(filePath.indexOf('/uploads'))
    const pictureUrl = `${req.protocol}://${req.get('host')}${fileSavePath}`
    console.log(pictureUrl)
    res.render('article-picture-succ', {
        picurl: JSON.stringify(pictureUrl),
    })
}

const postArticle = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { title, content, managerid, tagid } = req.body
    const result = await articleModel.postArticle(
        title,
        content,
        managerid,
        tagid,
        req.savefilename
    )
    // console.log(result)
    if (result.affectedRows > 0) {
        res.render('succ', {
            data: JSON.stringify({
                message: '发布成功！',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '发布失败！',
            }),
        })
    }
}

const allArticle = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    // res.send('ok.')
    const { pagesize, currentpage } = req.query
    console.log(pagesize, currentpage)
    const result = await articleModel.allArticle(~~pagesize, ~~currentpage)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const delArticle = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { id } = req.params
    const result = await articleModel.delArticle(id)

    if (result.affectedRows > 0) {
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
    articleModel.delArticle()
}

module.exports = {
    list,
    article,
    allCase,
    articlePicture,
    postArticle,
    allArticle,
    delArticle,
}
