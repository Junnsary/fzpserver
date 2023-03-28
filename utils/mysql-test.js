const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'hhrx',
    password: 'xhr',
    database: 'fzpdb',
    multipleStatements: true,
})

const query = async function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}
/**
 * 创建一个数据库连接
 */
const getConnection = async function () {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                resolve(connection)
            }
        })
    })
}
class DBUnity {
    /**
     * 开启数据库连接
     * @param {object} connection
     */
    constructor(connection) {
        this.blTransaction = false
        this.connection = connection
        /**
         * 开启事务
         */
        this.beginTransaction = async () => {
            return new Promise((resolve, reject) => {
                this.connection.beginTransaction((err, success) => {
                    if (err) {
                        this.blTransaction = false
                        reject(err)
                    } else {
                        this.blTransaction = true
                        resolve(success)
                    }
                })
            })
        }
        /**
         * 执行sql
         * @returns {object} is class dbResult
         */
        this.query = async (sql, arr = []) => {
            return new Promise((resolve, reject) => {
                this.connection.query(sql, arr, (err, rows) => {
                    if (!this.blTransaction) {
                        this.connection.release()
                        reject(new dbResult(0, false, '事务未开启', null))
                    }
                    if (err) {
                        reject(new dbResult(0, false, JSON.stringify(err), null))
                    } else {
                        resolve(new dbResult(1, true, 'success', rows))
                    }
                })
            })
        }
        /**
         * 提交事务
         */
        this.commit = async () => {
            return new Promise((resolve, reject) => {
                this.connection.commit((err) => {
                    if (err) {
                        this.connection.release()
                        reject(err)
                    } else {
                        this.connection.release()
                    }
                })
            })
        }
        /**
         * 回滚事务
         */
        this.rollback = async () => {
            this.connection.rollback(() => {
                this.connection.release()
            })
        }
    }
}

class dbResult {
    /**
     * 数据层结果返回
     * @param {number} code 返回状态码 0:操作失败,1:操作成功
     * @param {boolean} success
     * @param {string} message 返回信息
     * @param {object} data 返回数据对象
     */
    constructor(code, success, message, data) {
        this.code = code
        this.message = message
        this.data = data
        this.success = success
    }
}

module.exports = {
    query,
    DBUnity,
    getConnection,
}
