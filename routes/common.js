const express = require('express')
const mysql = require('../common/db.js')
const jwt = require('jsonwebtoken')
const config = require('../auth.config.js')
const router = express.Router()
router.get('/', function(req, res) {
    // 返回视图
    res.render('index', { title: 'Express'})
})
router.get('/userInfo', function(req, res) {
    const body = req.body
    console.log(body);
    res.send({
        code: 200,
        msg: '成功',
        data: body,
    })
})
// 登入
router.post('/login', async function(req, res) {
    const body = req.body
    let token = jwt.sign({name: body.username, password: body.password}, config.jwtSecretKey, { expiresIn: '10h' })
    let db = new mysql()
    let data = null
    let sql = `SELECT username, password FROM ky_user WHERE username = '${body.username}' and password = '${body.password}' `
    await db.selectData(sql).then((result) => {
        if (result.length) {
            res.send({
                code: 200,
                msg: '成功',
                data: data,
                token: 'Bearer ' + token,
            })
        } else {
            throw Error('账号或密码错误!')
        }
    }).catch((error) => {
        res.cc(error)
    })
})
// 注册
router.post('/register', async function(req, res) {
    const {username, password, email = '' } = req.body
    let db = new mysql()
    let data = null
    let sql = `INSERT INTO ky_user ( username, password, email ) VALUES ( '${ username }' , '${password}','${ email }' );`
    await db.updatedData(sql).then((res) => {
        data = res
    }).catch((error) => {
        res.cc(error)
    })
    res.send({
        code: 200,
        msg: '成功',
        data: data,
    })
})
module.exports = router