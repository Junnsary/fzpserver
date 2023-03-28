const query = require('../utils/mysqldb')

const signup = async (user) => {
    const sql = 'insert into users(id, email, passwd, name) ' + 'values(?, ?, ?, ?)'
    const results = await query(sql, [user.id, user.email, user.passwd, user.name])
    return results
}

const findUser = async (user) => {
    const sql = 'select * from users where id = ? or email = ?'
    const results = await query(sql, [user.id, user.email])
    return results
}

const login = async (id, passwd) => {
    const sql = 'select id, email, name, avatar from users where id = ? and passwd = ?'
    const result = await query(sql, [id, passwd])
    return result[0]
}

module.exports = {
    signup,
    findUser,
    login,
}
