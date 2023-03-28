const query = require('../utils/mysqldb')
const articleModel = require('../controllers/article')

const list = async (userid, type) => {
    //获取收藏的列表
    const result = await query('select * from collection c where c.user_id  = ? and c.type = ?', [
        userid,
        type,
    ])
    if (type === 'article') {
        //获取每篇文章
        for (const a of result) {
            const article = await query('select * from article a where  a.id = ?', [a.source_id])
            delete a.source_id
            a.source = article[0]
        }
    } else {
        //获取每个视频
        for (const a of result) {
            const article = await query('select * from video a where  a.id = ?', [a.source_id])
            delete a.source_id
            a.source = article[0]
        }
    }
    return result
}

const add = async (userId, sourceId, type) => {
    return await query('insert into collection(user_id, source_id, type) values(?, ?, ?)', [
        userId,
        sourceId,
        type,
    ])
}

module.exports = {
    list,
    add,
}
