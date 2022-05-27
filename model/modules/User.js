//定义ZK_USERINFO实体类
const propertys = [
    'id',
    'username',
    'province',
    'login_ip',
    'login_time',
    'update_timeCOMMENT',
    'recommend'
];

class USER {
    constructor() {
        propertys.forEach(name => {
            this[name] = undefined;
        });
        this.set(arguments[0]);
    }
    get(key) {
        return this[key];
    }
    set() {
        if (typeof arguments[0] === "object") {
            for (let name in arguments[0]) {
                if (propertys.indexOf(name) > -1) {
                    this[name] = arguments[0][name];
                }
            }
        }
    }
}

module.exports = USER;