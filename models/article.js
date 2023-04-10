const query = require('../utils/mysqldb')
const moment = require('moment')
const { getTag } = require('../utils/sql-select')

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

const allCase = async () => {
    /**
     * 查询 case下的数据
     * {
     *      tag：tag
     *      data： [
     *          {},{}
     *      ]
     * }
     */
    const result = [
        {
            tag: {
                id: -1,
                name: '推荐',
                type: 'article',
                category: 'case',
            },
            data: [],
        },
    ]
    const tagList = await query('select * from tags where type = ? and category = ?', [
        'article',
        'case',
    ])
    let sum = []
    for (let tag of tagList) {
        const data = await query('select * from articles where tag_id = ?', [tag.id])
        result.push({
            tag,
            data,
        })
        sum = sum.concat(data)
    }
    result[0].data = sum
    return result
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
    return await query('delete from articles where id = ?', [id])
}

module.exports = {
    list,
    article,
    findArticle,
    allCase,
    postArticle,
    allArticle,
    delArticle,
}
