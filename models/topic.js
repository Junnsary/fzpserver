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
        jsonSolution.forEach(async (v) => {
            await query('insert into solutions(content, accurate, topic_id) values(?,?,?)', [
                v.content,
                v.accurate,
                topic.insertId,
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
