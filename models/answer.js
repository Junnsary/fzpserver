const query = require('../utils/mysqldb')
const sqlSelect = require('../utils/sql-select')
const { questionList } = require('./question')
const list = async (questionId) => {
    const result = await query('select * from answers where question_id = ? ', [questionId])

    for (const t of result) {
        const user = await sqlSelect.getUser(t.user_id)
        delete t.user_id
        t.user = user
    }

    return result
}

const addAnswer = async (content, questionId, date, userId) => {
    return await query(
        `insert into answers(content, created_at, question_id, user_id) values(?,? , ?, ?)`,
        [content, date, questionId, userId]
    )
}

module.exports = {
    list,
    addAnswer,
}
