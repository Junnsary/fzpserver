const query = require('../utils/mysqldb')
const { getTag } = require('../utils/sql-select')

const list = async (tagId) => {
    const result = await query('select * from videos where tag_id = ?', [tagId])
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

const video = async (id) => {
    const result = await query('select * from videos where id = ? and status = "normal"', [id])
    console.log(result)
    const video = result[0]
    const manager = await query('select id, name from managers  where id = ?', [video.manager_id])
    delete video.manager_id
    video.manager = manager[0]
    return video
}

const postVideo = async (title, tagId, managerId, video, cover) => {
    return await query(
        'insert into videos(title, tag_id, manager_id, file_name, cover) values(?, ?, ?, ?, ?)',
        [title, tagId, managerId, video, cover]
    )
}

const allVideo = async (pageSize, currentPage) => {
    //select * from articles a  LIMIT 0,10;
    //select count(*) from articles a  LIMIT 0,10;
    const result = await query('select * from videos a  LIMIT ? offset ?', [
        pageSize,
        pageSize * (currentPage - 1),
    ])
    const total = await query('select count(*) as total from videos ')
    for (let article of result) {
        const tag = await getTag(article.tag_id)
        delete article.tag_id
        article.tag = tag
    }
    console.log(result.length)
    return { articleList: result, total: total[0].total }
}

const delVideo = async (id) => {
    const video = await query('select * from videos where id = ?', [id])
    const result = await query('delete from videos where id = ?', [id])
    //删除收藏的内容
    await query('delete from favorites where source_id = ? and tag_id = ?', [id, video[0].tag_id])
    return { deleResult: result, coverName: video[0] }
}

module.exports = {
    list,
    video,
    postVideo,
    allVideo,
    delVideo,
}
