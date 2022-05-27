const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../auth.config.js')
const router = express.Router()
router.get('/verify/get', function(req, res) {
    console.log(req.query)
    console.log(req.session)
    res.send({
        code: 200,
        msg: '成功',
        data: req.query,
    })
})
router.post('/verify/post', function(req, res) {
    const body = req.body
    console.log(body);
    console.log(req.session)
    res.send({
        code: 200,
        msg: '成功',
        data: body,
    })
})
router.get('/userInfo', function(req, res) {
    const query = req.query
    const auth = jwt.decode(req.auth)
    console.log(auth)
    res.send({
        code: 200,
        msg: '成功',
        data: auth
    })
})
module.exports = router

