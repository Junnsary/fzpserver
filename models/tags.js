const query = require('../utils/mysqldb')

const findTag = async (type) => {
    return await query('select * from tags where type = ?', [type])
}

const findCategory = async (type, category) => {
    return await query('select * from tags where type = ? and category = ?', [type, category])
}

const knowledge = async () => {
    const article = await query('select * from tags where type = ? and category = ?', [
        'article',
        'knowledge',
    ])
    console.log(article)
    const video = await query('select * from tags where type = ? and category = ?', [
        'video',
        'knowledge',
    ])
    console.log(video)
    const result = article.concat(video)
    return result
}

module.exports = {
    findTag,
    findCategory,
    knowledge,
}
