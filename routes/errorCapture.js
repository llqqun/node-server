/* 
* 网站错误捕获
*/
const mysql = require('../common/db')
const express = require('express')
const router = express.Router()
const error_module = require('../model/Error')
const moduleValidate = require('../utils')
const db = new mysql()
router.post('/add', moduleValidate(error_module), async function(req, res) {
    const body = req.body
    const sql = `insert into site_error set ?`
    const result = await db.install(sql, body)
    // console.log('15',result)
    if (result.error) {
        res.cc(err)
    } else {
        res.send({
            code: 600,
            msg: '成功',
        })
    }
})
module.exports = router