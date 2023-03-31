const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'hhrx',
    password: 'xhr',
    database: 'fzpdb',
    multipleStatements: true,
})

const query = (sql, other = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connect) => {
            if (err) reject(err)
            connect.query(sql, other, (err, results, fields) => {
                if (err) reject(err)
                // resolve({
                //     results,
                //     fields
                // })
                resolve(results)
            })
            connect.release()
        })
        // pool.query(sql, other, (err, results, fields) => {
        //     if (err) reject(err)
        //     // resolve({
        //     //     results,
        //     //     fields
        //     // })
        //     resolve(results)
        // })
    })
}

// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'hhrx',
//     password: 'xhr',
//     database: 'fzpdb',
// })

// const query = (sql, other = []) => {
//     return new Promise((resolve, reject) => {
//         connection.query(sql, other, function (err, results, fields) {
//             if (err) {
//                 reject(err)
//             }
//             resolve(results)
//         })
//     })
// }

// simple query

module.exports = query
