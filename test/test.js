const collection = require('../models/collection')

const cancel = async () => {
    console.log(await collection.cancel(1, 16, 'koussa1'))
}

const add = async () => {
    console.log(await collection.add(1, 16, 'koussa1'))
}

// cancel()

add()

//ResultSetHeader {
//     fieldCount: 0,
//     affectedRows: 1,
//     insertId: 0,
//     info: '',
//     serverStatus: 34,
//     warningStatus: 0
//}
