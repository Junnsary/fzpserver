const videoModel = require('../models/video')
const fs = require('fs')

const list = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { tagid } = req.query
    try {
        const result = await videoModel.list(tagid)
        res.render('succ', {
            data: JSON.stringify(result),
        })
    } catch (e) {
        res.render('fail', {
            data: JSON.stringify({
                message: '查询视频列表失败。',
            }),
        })
    }
}

const video = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { id } = req.params
    const result = await videoModel.video(id)
    console.log(result)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const postVideo = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { title, tagid, managerid } = req.body
    const videoName = req.VideoName
    const cover = req.coverImageName
    const result = await videoModel.postVideo(title, tagid, managerid, videoName, cover)
    if (result.affectedRows > 0) {
        res.render('succ', {
            data: JSON.stringify({
                message: '发布成功！',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '发布失败！',
            }),
        })
    }
}

module.exports = {
    list,
    video,
    postVideo,
}
