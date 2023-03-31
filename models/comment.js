const query = require('../utils/mysqldb')

const list = async (sourceId, tagId) => {
    const result = await query('select * from comments where source_id = ? and tag_id = ?', [
        sourceId,
        tagId,
    ])

    for (let comm of result) {
        const user = await query('select id, name, avatar from users where id = ?', [comm.user_id])
        delete comm.user_id
        comm.user = user[0]
    }

    return result
}

const add = async (sourceId, tagId, userId, content) => {
    return await query(
        'insert into comments(source_id, tag_id, user_id, content) values(?, ?, ?, ?)',
        [sourceId, tagId, userId, content]
    )
}

module.exports = {
    list,
    add,
}
