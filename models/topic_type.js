const query = require('../utils/mysqldb')

exports.getType = async () => {
    return await query('select * from topic_type')
}

exports.add = async (name, describe) => {
    try {
        const reuslt = await query('insert into topic_type(name, type_describe) values(?,?)', [
            name,
            describe,
        ])
        return reuslt
    } catch (e) {
        console.log(e)
        return false
    }
}

exports.del = async (id) => {
    try {
        const reuslt = await query('delete from topic_type where id = ?', [id])
        return reuslt
    } catch (e) {
        console.log(e)
        return false
    }
}
