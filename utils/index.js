const Joi = require('joi')
const moduleValidate = function (schemas) {
  // TODO: 用户指定了什么 schema，就应该校验什么样的数据
  return function (req, res, next) { 
    ['body', 'query', 'params'].forEach(key => {
      if (!schemas[key]) return
      const schema = Joi.object(schemas[key])
      const { error } = schema.validate(req[key])
      if (error) {
        throw error
      }
    })

    next()
  }
}

module.exports = moduleValidate