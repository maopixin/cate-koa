const fs = require('fs');
const path = require('path');
const loginMiddleware = require('../utils/decodetoken');

function addMapping(router, mapping) {
    mapping.forEach(e => {
        // 把中间件属性变为数组
        if(!Array.isArray(e.middleware)){
            e.middleware = [e.middleware]
        }
        // 是否需要登录？
        if(e.isLogin){
            e.middleware.unshift(loginMiddleware)
        }
        switch (e.type) {
            case "GET":
                router.get(e.url, ...e.middleware);
                console.log(`register URL mapping: GET ${e.url}`);
                break;
            case "POST":
                router.post(e.url, ...e.middleware);
                console.log(`register URL mapping: POST ${e.url}`);
                break;
            default:
                console.log(`invalid URL: ${e.url}`);
                break;
        }
    });
}

function addControllers(router) {
    var files = fs.readdirSync(path.resolve(__dirname, '..') + '/router');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(path.resolve(__dirname, '..') + '/router/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let controllers_dir = dir || 'router',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};