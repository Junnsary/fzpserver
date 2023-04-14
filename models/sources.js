const query = require('../utils/mysqldb')

const list = async (type, tagid) => {
    let result
    if (type == 'article') {
        result = await query(`select * from articles where tag_id in (${tagid})`)
    } else {
        result = await query(`select * from videos where tag_id in (${tagid}) `)
    }
    for (let t of result) {
        const manager = await query('select id, name from managers where id = ?', [t.manager_id])
        const tag = await query('select * from tags where id = ?', [t.tag_id])
        delete t.manager_id
        delete t.tag_id
        t.manager = manager[0]
        t.tag = tag[0]
    }
    return result
    //----------------------------------------------------------
    // result = await query(
    //     `select a.*, t.id as tag_id , t.name as tag_name, t.type as tag_type , t.category as tag_category ,  m.name as manager_name
    //     from
    //     articles a
    //     join tags t
    //     join managers m
    //     on a.tag_id = t.id and a.manager_id  = m.id
    //     where
    //     tag_id in (${tagid}) `
    // )
    // for (temp of result) {
    //     const tag = {
    //         id: temp.tag_id,
    //         name: temp.tag_name,
    //         type: temp.tag_type,
    //         category: temp.tag_category,
    //     }
    //     const manager = {
    //         name: temp.manager_name,
    //     }
    //     temp.tag = tag
    //     temp.manager = manager
    // }
    // return result
    //------------------------------------------------------------------
}

const recommendation = async (num) => {
    const articles = await query(
        `select a.* from articles a join tags t  on a.tag_id  = t.id WHERE t.type = "article" and t.category = "knowledge" order by RAND() LIMIT ${num} `
    )

    const videos = await query(
        `select v.* from videos v join tags t  on v.tag_id  = t.id WHERE t.type = "video" and t.category = "knowledge" order by RAND() LIMIT ${
            num / 5
        }`
    )
    result = articles
    for (const temp of videos) {
        //根据articles 的数量
        let i = Math.random() * result.length
        //随机插入位置
        result.splice(i, 0, temp)
    }
    for (const temp of result) {
        const manager = await query('select id, name from managers where id = ?', [temp.manager_id])
        const tag = await query('select * from tags where id = ?', [temp.tag_id])
        delete temp.manager_id
        delete temp.tag_id
        temp.manager = manager[0]
        temp.tag = tag[0]
    }
    // console.log(result)
    return result
}

const quantity = async () => {
    /**
     * 查询 发布的文章和视频数量
     * 用户的数量
     */
    const article = (await query('select count(*) as num from articles'))[0]
    const video = (await query('select count(*) as num from videos'))[0]
    const user = (await query('select count(*) as num from users'))[0]
    // console.log(articleSum)
    return {
        article: article.num,
        video: video.num,
        user: user.num,
    }
}

module.exports = {
    list,
    recommendation,
    quantity,
}
