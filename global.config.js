const express = require('express')
const router = require('./routes/index')
const commonApi = require('./routes/common')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// cors 解决跨域问题 'Access-Control-Allow-Origin', '*'
app.use(cors())

// 这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({
    extended: false
}))
// json 数据解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 静态文件
app.use('/public', express.static('public'))

// 错误响应处理
app.use((req, res, next) => {
    // status 默认值为 1，表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function (err, status = 1) {
        console.log('错误响应处理')
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./auth.config.js')
// token 验证
app.use(expressJWT({
    secret: config.jwtSecretKey,
    algorithms: ["HS256"],
    getToken: function fromHeaderOrQuerystring(req) {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
          ) {
              req.auth = req.headers.authorization.split(" ")[1]
            return req.headers.authorization.split(" ")[1];
          } else if (req.query && req.query.token) {
            return req.query.token;
          }
          return null;
    }
}).unless({
    path: [/^\/common/]
}))

app.use('/view', express.static('view'))
app.use('/public', express.static('public'))
// 路由
app.use('/api', router)
app.use('/common', commonApi)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    console.log('错误中间件')
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知的错误
    res.cc(err)
})

module.exports = app