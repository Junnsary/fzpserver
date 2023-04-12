const query = require('../utils/mysqldb')

const passwd = async (id, newpasswd) => {
    return await query('update managers set passwd = ? where id = ? ', [newpasswd, id])
}

const findAdmin = async (id, oldpasswd) => {
    return await query('select * from managers where id = ? and passwd = ?', [id, oldpasswd])
}

const login = async (id, passwd) => {
    return await query('select id, name from managers where id = ? and passwd = ?', [id, passwd])
}

module.exports = {
    passwd,
    login,
    findAdmin,
}
