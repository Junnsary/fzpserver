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

const add = async (sourceId, tagId, userId) => {
    return await query('insert into collections(source_id, tag_id, user_id) values(?, ?, ?)', [
        sourceId,
        tagId,
        userId,
    ])
}

const cancel = async (sourceId, tagId, userId) => {
    return await query(
        'DELETE FROM collections WHERE source_id  = ? and tag_id  = ? AND user_id  = ?',
        [sourceId, tagId, userId]
    )
}

const isCollect = async (sourceId, tagId, userId) => {
    return (
        await query(
            'select * from collections c WHERE c.source_id = ? and c.tag_id = ? and user_id = ?',
            [sourceId, tagId, userId]
        )
    ).length > 0
        ? true
        : false
}

module.exports = {
    list,
    add,
    isCollect,
    cancel,
}
