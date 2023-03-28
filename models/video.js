const query = require('../utils/mysqldb')

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
    const result = (await query('select * from video where id = ?', [id]))[0]
    const manager = await query('select id, name from manager  where id = ?', [result.manager_id])
    delete result.manager_id
    result.manager = manager[0]
    return result
}

module.exports = {
    list,
    video,
}
