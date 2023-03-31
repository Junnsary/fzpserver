const query = require('../utils/mysqldb')

const getSource = async (sourceId, type) => {
    const source = (await query(`select * from ${type + 's'} where id = ?`, [sourceId]))[0]
    const tag = await getTag(source.tag_id)
    const manager = await getManager(source.manager_id)
    delete source.manager_id
    delete source.tag_id
    source.manager = manager
    source.tag = tag
    return source
}

const getTag = async (tagId) => {
    return (await query('select * from tags where id = ?', [tagId]))[0]
}

const getManager = async (managerId) => {
    return (await query('select id, name from managers where id = ?', [managerId]))[0]
}

const getUser = async (userId) => {
    return (await query('select id, email, name, avatar from users where id = ?', [userId]))[0]
}

module.exports = {
    getSource,
    getTag,
    getManager,
    getUser,
}
