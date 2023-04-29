const query = require('../utils/mysqldb')
const moment = require('moment')
const { getTag } = require('../utils/sql-select')

const article = async (id) => {
    const article = await query('select * from articles where id = ? ', [id])
    const manager = await query('select id, name from managers where id = ?', [
        article[0].manager_id,
    ])
    delete article[0].manager_id
    article[0].manager = manager[0]

    return article[0]
}

const findArticle = async (id) => {
    return await query('select * from articles where id = ?', [id])
}


const postArticle = async (title, content, managerid, tagid, cover) => {
    return await query(
        'insert into articles(title, content, manager_id, tag_id, cover) values(?, ?, ?, ?, ?)',
        [title, content, managerid, tagid, cover]
    )
}

const allArticle = async (pagesize, currentpage) => {
    //select * from articles a  LIMIT 0,10;
    //select count(*) from articles a  LIMIT 0,10;
    const result = await query('select * from articles a  LIMIT ? offset ?', [
        pagesize,
        pagesize * (currentpage - 1),
    ])
    const total = await query('select count(*) as total from articles ')
    for (let article of result) {
        const tag = await getTag(article.tag_id)
        delete article.tag_id
        article.tag = tag
    }
    console.log(result.length)
    return { articleList: result, total: total[0].total }
}

const delArticle = async (id) => {
    //不能真正地删除，
    const article = await query('select * from articles where id = ?', [id])
    const result = await query('delete from articles where id = ?', [id])
    return { deleResult: result, coverName: article[0] }
}

module.exports = {
    article,
    findArticle,
    postArticle,
    allArticle,
    delArticle,
}
