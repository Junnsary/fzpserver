const path = require('path')
const multer = require('multer')
const mime = require('mime')
const fs = require('fs')

let coverImageName = ''
let VideoName = ''

const storage = multer.diskStorage({
    //设置保存路径
    destination: function (req, file, cb) {
        console.log(file.fieldname)
        if (file.fieldname === 'video') {
            cb(null, path.join(__dirname, '../public/uploads/videos/'))
        } else if (file.fieldname === 'cover') {
            cb(null, path.join(__dirname, '../public/uploads/images/'))
        }
    },
    //设置名字
    filename: function (req, file, cb) {
        const ext = mime.getExtension(file.mimetype)
        if (file.fieldname === 'video') {
            VideoName = `${file.fieldname}-${Date.now()}.${ext}`
            cb(null, VideoName)
        } else if (file.fieldname === 'cover') {
            coverImageName = `${file.fieldname}-${Date.now()}.${ext}`
            cb(null, coverImageName)
        }
    },
})

//设置文件大小和文件数量
const limits = {
    fileSize: 1024 * 1024 * 1000,
    files: 4,
}

//设置文件类型
function fileFilter(req, file, cb) {
    // 这个函数应该调用 `cb` 用boolean值来
    // 指示是否应接受该文件

    // 拒绝这个文件，使用`false`，像这样:
    const accessType = ['image/jpg', 'image/jpeg', 'image/png']

    if (!accessType.includes(file.mimetype)) {
        // 如果有问题，你可以总是这样发送一个错误:
        cb(new Error('文件类型错误。'))
    } else {
        cb(null, true)
    }
}

const uploadVideoMiddleware = (VideoCover) => {
    const upload = multer({
        storage,
        limits,
        // fileFilter,
    }).fields(VideoCover)

    return (req, res, next) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log(err.message)
                res.render('fail', {
                    data: JSON.stringify({
                        message: '文件太大。',
                    }),
                })
            } else if (err) {
                res.render('fail', {
                    data: JSON.stringify({
                        message: err.message,
                    }),
                })
            } else {
                // if (uploadFileName !== '') {
                //     req.saveVideoname = uploadFileName
                req.VideoName = VideoName
                req.coverImageName = coverImageName
                /*
                 * 删除旧的文件
                 */
                // const { companyLogo_old } = req.body
                // // console.log(companyLogo_old)
                // try {
                //     fs.unlinkSync(path.join(__dirname, `../public/uploads/${companyLogo_old}`))
                // } catch (err) {
                //     console.log(err)
                // }
                // }
                next()
            }
        })
    }
}

module.exports = uploadVideoMiddleware
