const { render } = require('ejs')
const articleModel = require('../models/article')
const monent = require('moment')
const url = require('url')
const { deleteFile } = require('../utils/file')
const path = require('path')
const fs = require('node:fs/promises')


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

const articlePicture = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')

    // const filePath = req.file.path
    // console.log(req.savefilename)
    // const fileSavePath = `/uploads/images/${req.savefilename}`
    const fileSavePath = `/uploads/images/${req.savefilename}`
    // const pictureUrl = `${req.protocol}://${req.get('host')}${fileSavePath}`
    const pictureUrl = `${fileSavePath}`
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
    deleteFile(path.resolve(__dirname, `../public/uploads/images/${result.coverName.cover}`))
    if (result.deleResult.affectedRows > 0) {
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
    article,
    articlePicture,
    postArticle,
    allArticle,
    delArticle,
}
