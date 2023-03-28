const query = require('../utils/mysqldb')
const moment = require('moment')

const list = async (tagId) => {
    const result = await query(`select * from articles where tag_id in (${tagId})`)
    for (t of result) {
        const manager = await query('select id, name from managers where id = ?', [t.manager_id])
        const tag = await query('select * from tags where id = ?', [t.tag_id])
        delete t.manager_id
        delete t.tag_id
        t.manager = manager[0]
        t.tag = tag[0]
    }

    return result
}

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

module.exports = {
    list,
    article,
    findArticle,
}
