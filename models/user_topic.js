const { use } = require('../routes/user_topic')
const query = require('../utils/mysqldb')

const countTopics = (topics) => {
    let sum = 0
    let topicScore = 100 / topics.length //计算每一个题的分数，总共一百分
    const goodArr = []
    const errorArr = []
    for (const temp of topics) {
        for (const solution of temp.solutions) {
            if (solution.id === temp.topic.choose) {
                if (solution.accurate === 1) {
                    sum += 1
                    temp.topic.right = 1
                    goodArr.push(temp)
                } else { 
                    temp.topic.right = 0
                    errorArr.push(temp)
                }
            }
        }
    }

    return { score: sum * topicScore, rightArr: goodArr, errorArr }
}

const countSuggestion = (count) => {
    if (count.score === 100) {
        return '题目全都答对了，您的反诈骗意识较高，可以选择再自测。'
    } else {
        // console.log('没有满分')
        const errorSet = new Set() //[{name:, describe:}}

        count.errorArr.forEach((v) => {
            errorSet.add(v.topic.topic_type.type_describe)
        })
        // console.log(errorSet)
        return Array.from(errorSet)
            .filter((v) => typeof v === 'string')
            .map((item) => item + '|')
            .join('')
    }
}

exports.submitUserTopic = async (topics, userId) => {
    try {
        /**g
         * 要算出分数，和给出建议,用户ID
         * 分数：
         * 1. 一共的题目数量、100分，总分/数量，算出一题多少分
         * 2. 得出答对的题目数量，题分 * 答对数量
         * 3. 得出错的题目，找出一共几种不同的类型，然后再给出建议。
         */
        // console.log(topics)
        const count = countTopics(topics)
        // console.log(score)
        const suggestion = countSuggestion(count)
        // console.log(userId)
        // console.log('score:', count.score)
        // console.log('suggestion:', suggestion)
        const insertUserTopic = await query('insert into user_topics(user_id, score, suggestion, topic_right,topic_error,topic_sum) values(?,?,?,?,?,?)',[userId, count.score, suggestion,count.rightArr.length,count.errorArr.length,topics.length])
        // console.log(insertUserTopic)
        for (const temp of topics) {
            await query('insert into topic_choose(topic_id, user_topic_id, choose, choose_right) values(?,?,?,?)', [temp.topic.id, insertUserTopic.insertId, temp.topic.choose,temp.topic.right])
        }
        return insertUserTopic.insertId
    } catch (e) {
        console.log(e)
        return false
    }
}

exports.testResult = async (usertopicid) => {
    const userTopic = await query('select * from user_topics where id = ?', [usertopicid])
    const userChoose = await query('select * from topic_choose where user_topic_id = ?', [userTopic[0].id])
    for (const uc of userChoose) {
        const topic = await query('select * from topics where id = ?', uc.topic_id)
        const solutions = await query('select * from solutions where topic_id = ?', topic[0].id)
        delete uc.topic_id
        uc.topic = {topicInfo:topic[0], solutions}
    }

    return {userTopic:userTopic[0],userChoose}
}

exports.userTopicList = async (userId) => {
    return await query('select * from user_topics where user_id = ? order by id desc', [userId])
}