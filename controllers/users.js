const usersModel = require('../models/users')

//用户注册
const signup = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    console.log(req.body)
    try {
        const user = await usersModel.findUser(req.body)
        // console.log(user)
        if (user.length > 0) {
            res.render('fail', {
                data: JSON.stringify({
                    message: '注册的用户ID或者邮箱重复，请重新输入。',
                }),
            })
        } else {
            const results = await usersModel.signup(req.body)
            res.render('succ', {
                data: JSON.stringify({
                    message: '注册成功。',
                }),
            })
        }
    } catch (e) {
        res.render('fail', {
            data: JSON.stringify({
                message: e,
            }),
        })
    }
}

const login = async (req, res, next) => {
    res.header('content-type', 'application/json; charset=UTF-8')
    const { id, passwd } = req.body
    console.log(id, passwd)
    const result = await usersModel.login(id, passwd)
    try {
        console.log(result)
        if (result) {
            res.render('succ', {
                data: JSON.stringify(result),
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '登录失败。',
                }),
            })
        }
    } catch (e) {
        res.render('fail', {
            data: JSON.stringify({
                message: '登录失败。',
            }),
        })
    }
}

module.exports = {
    signup,
    login,
}
