const mysql = require('mysql')
const pond = mysql.createPool({
    host: 'lqbook.cloud',
    port: '3306',
    user: 'lq',
    password: 'lq123456',
    database: 'xs'
})
// db.query('select * from ky_user', (err, results) => {
//     console.log(err)
//     console.log(results)
// })
class MysqlHandel {
    constructor() {
        this.mysqlInit = pond
    }
    selectData(sql) {
        return new Promise((resolve, reject) => {
            this.mysqlInit.query(sql, (err, results) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    let arrayData = []
                    results.forEach(element => {
                        arrayData.push(element)
                    });
                    resolve(arrayData)
                }
            })
        })
    }
    updatedData(sql) {
        return new Promise((resolve, reject) => {
            this.mysqlInit.query(sql, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    resolve(results)
                }
            })
        })
    }
    install(sql, params) {
        return new Promise(async (resolve, reject) => {
            await this.mysqlInit.query(sql, params, (error, results) => {
                if (error) {
                    reject({ error })
                } else {
                    resolve(results)
                }
            })
        })
    }
}
module.exports = MysqlHandel