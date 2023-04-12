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

const list = async (category, type) => {
    let result
    if (category === 'all') {
        result = await query('select * from tags')
    } else {
        if (type === 'all') {
            result = await query('select * from tags where category = ?', [category])
        } else {
            result = await query('select * from tags where category = ? and type = ?', [
                category,
                type,
            ])
        }
    }
    return result
}

const add = async (category, type, name) => {
    return await query('insert into tags(category, type, name) values(?, ?, ?)', [
        category,
        type,
        name,
    ])
}

const delTag = async (id) => {
    return await query('delete from tags where id = ?', [id])
}

module.exports = {
    findTag,
    findCategory,
    knowledge,
    list,
    add,
    delTag,
}
