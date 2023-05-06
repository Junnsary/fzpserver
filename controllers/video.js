const videoModel = require('../models/video')
const fs = require('fs')
const { deleteFile } = require('../utils/file')
const path = require('path')


const video = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { id } = req.params
    console.log(id)
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
    console.log("title:", title)
    console.log("tagid:", tagid)
    console.log("managerid:", managerid)
    console.log("videoname:", videoName)
    console.log("cover:", cover)
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

const allVideo = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    // res.send('ok.')
    const { pagesize, currentpage } = req.query
    console.log(pagesize, currentpage)
    const result = await videoModel.allVideo(~~pagesize, ~~currentpage)
    res.render('succ', {
        data: JSON.stringify(result),
    })
}

const delVideo = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { id } = req.params
    const result = await videoModel.delVideo(id)

    //删除视频
    deleteFile(path.resolve(__dirname, `../public/uploads/videos/${result.coverName.file_name}`))
    //删除封面
    deleteFile(path.resolve(__dirname, `../public/uploads/images/${result.coverName.cover}`))
    if (result.deleResult.affectedRows > 0) {
        res.render('succ', {
            data: JSON.stringify({
                message: '删除成功！',
            }),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '删除失败！',
            }),
        })
    }
}

module.exports = {
    video,
    postVideo,
    allVideo,
    delVideo,
}
