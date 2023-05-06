const { use } = require('../app')
const query = require('../utils/mysqldb')
const sqlSelect = require('../utils/sql-select')

const askQuestion = async (userId, content) => {
    return await query('insert into questions(content, user_id) values(?, ?)', [content, userId])
}

const questionList = async (userId, review) => {
    let result
    if (!userId) {
        result = await query(
            `select * from questions where review = ? and status = 'normal' order by rand() limit 10 `,
            [review]
        )
    } else {
        result = await query(
            'select * from questions where user_id = ? and review = ?  and status = "normal" ',
            [userId, review]
        )
    }

    for (const t of result) {
        const user = await sqlSelect.getUser(t.user_id)
        delete t.user_id
        t.user = user

        //查询回答数

        const num = (
            await query('select count(*) as num from answers where question_id = ?', [t.id])
        )[0].num
        t.answer_num = num
    }

    return result
}

const allQuestion = async (pagesize, currentpage, review) => {
    const result = await query(
        `select * from questions where status = 'normal' and review in (${review}) LIMIT ? offset ?`,
        [pagesize, pagesize * (currentpage - 1)]
    )
    const total = await query('select count(*) as total from questions where status = "normal" ')
    return { articleList: result, total: total[0].total }
}

const review = async (questionId, reviewCode) => {
    return await query(`update questions set review = ${reviewCode} where id = ${questionId}`)
}

const deleteQuestion = async (questionId) => {
    return await query(`update questions set status = 'delete' where id = ${questionId}`)
}

module.exports = {
    askQuestion,
    questionList,
    allQuestion,
    review,
    deleteQuestion,
}
