const { json } = require('express')
const query = require('../utils/mysqldb')

exports.add = async (title, type, solution) => {
    try {
        const topic = await query('insert into topics(title, topic_type_id) values(?,?)', [
            title,
            type,
        ])
        // console.log(topic)
        const jsonSolution = JSON.parse(solution)
        console.log(jsonSolution)
        jsonSolution.forEach(async (v) => {
            await query('insert into solutions(content, accurate, topic_id, letter_num) values(?,?,?,?)', [
                v.content,
                v.accurate,
                topic.insertId,
                v.letter
            ])
        })
        return true
    } catch (e) {
        return false
    }
}

exports.list = async (size, page) => {
    let result = []
    try {
        const topic = await query('select * from topics where status ="normal" limit ? offset ?', [
            size,
            size * (page - 1),
        ])
        const topicTotal = await query('select * from  topics where  status ="normal"')
        for (const temp of topic) {
            const topicType = await query('select * from topic_type where id = ?', [
                temp.topic_type_id,
            ])
            delete temp.topic_type_id
            temp.topic_type = topicType[0]
            const solutions = await query('select * from solutions where topic_id = ?', [temp.id])
            result.push({
                topic: temp,
                solutions,
            })
        }
        return { total: topicTotal.length, topic: result }
    } catch (e) {
        console.log(e)
        return false
    }
}

exports.delTopic = async (topicid) => {
    try {
        const t = await query('update topics set status = "delete" where id = ?', [topicid])
        console.log(t)
        return t
    } catch (e) {
        return false
    }
}

exports.startTest = async () => {
    try {
        const result = []
        const topics = await query(
            'select * from topics where status="normal" order by rand() limit 10'
        )
        for (const t of topics) {
            const topic_type = await query('select * from topic_type where id = ?', [
                t.topic_type_id,
            ])
            delete t.topic_type_id
            t.topic_type = topic_type[0]
            const solutions = await query('select * from solutions where topic_id = ?', [t.id])
            result.push({
                topic: t,
                solutions,
            })
        }
        return result
    } catch (e) {
        return false
    }
}
