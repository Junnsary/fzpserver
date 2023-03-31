const query = require('../utils/mysqldb')
const articleModel = require('../controllers/article')
const selectUtils = require('../utils/sql-select')

const list = async (userid) => {
    //获取收藏的列表
    const all = await query('select * from favorites where user_id = ?', [userid])
    const articles = []
    const videos = []
    for (const Favorites of all) {
        const tag = await selectUtils.getTag(Favorites.tag_id)
        const source = await selectUtils.getSource(Favorites.source_id, tag.type)
        const user = await selectUtils.getUser(Favorites.user_id)
        delete Favorites.tag_id
        delete Favorites.source_id
        delete Favorites.user_id
        Favorites.source = source
        Favorites.tag = tag
        Favorites.user = user
        if (tag.type === 'article') {
            articles.push(Favorites)
        } else {
            videos.push(Favorites)
        }
    }

    // console.log(all)
    // console.log('------------------------------------------------')
    // console.log(articles)
    // console.log('------------------------------------------------')
    // console.log(videos)
    // console.log('------------------------------------------------')
    const result = {
        all,
        articles,
        videos,
    }
    return result
}

const add = async (sourceId, tagId, userId) => {
    return await query('insert into favorites(source_id, tag_id, user_id) values(?, ?, ?)', [
        sourceId,
        tagId,
        userId,
    ])
}

const cancel = async (sourceId, tagId, userId) => {
    return await query(
        'DELETE FROM favorites WHERE source_id  = ? and tag_id  = ? AND user_id  = ?',
        [sourceId, tagId, userId]
    )
}

const isFavorites = async (sourceId, tagId, userId) => {
    return (
        await query(
            'select * from favorites c WHERE c.source_id = ? and c.tag_id = ? and user_id = ?',
            [sourceId, tagId, userId]
        )
    ).length > 0
        ? true
        : false
}

module.exports = {
    list,
    add,
    isFavorites,
    cancel,
}
