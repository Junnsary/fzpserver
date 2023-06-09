const { name } = require('ejs')
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

const editUser = async (avatarName, userName, useremail, id) => {
    try {
        if (avatarName) {
            return await query('update users set name = ?, email = ?, avatar =? where id = ?', [userName, useremail, avatarName, id])
            console.log("修改头像")
        } else {
            return await query('update users set name = ?, email = ? where id = ?', [userName, useremail, id])
            console.log("没修改头像的")
        }
    } catch(e) {
        console.log(e)
        return false
    }

}

module.exports = {
    signup,
    findUser,
    login,
    editUser
}
