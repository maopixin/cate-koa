const fs = require('fs');
var path = require('path');


function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
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