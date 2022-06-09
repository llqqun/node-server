const joi = require('joi')
//定义ZK_USERINFO实体类
const propertys = {
    'id': 0,
    'error_url': joi.string().required(),
    'error_params': '',
    'error_node': ''
};

module.exports = {
    body: propertys
};