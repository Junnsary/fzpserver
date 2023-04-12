const managerModel = require('../models/manager')

const passwd = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { oldpasswd, newpasswd, id } = req.body
    console.log('old:', oldpasswd, 'new:', newpasswd, 'id:', id)
    const queryAdmin = await managerModel.findAdmin(id, oldpasswd)
    if (queryAdmin.length > 0) {
        const result = await managerModel.passwd(id, newpasswd)
        console.log(result)
        if (result.affectedRows > 0) {
            res.render('succ', {
                data: JSON.stringify({
                    message: '修改成功！',
                }),
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '修改失败！',
                }),
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '原密码错误！',
            }),
        })
    }
}

const login = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { id, passwd } = req.body
    console.log(id, passwd)
    const result = await managerModel.login(id, passwd)
    if (result.length > 0) {
        res.render('succ', {
            data: JSON.stringify(result[0]),
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '登录失败！',
            }),
        })
    }
}

module.exports = {
    passwd,
    login,
}
