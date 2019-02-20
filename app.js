const Koa = require("koa");
const Router = require("koa-router");
const Static = require("koa-static-cache");
const cors = require("koa-cors");
const koaBody = require('koa-body');
const render = require("koa-swig");
const co = require('co');
const controller = require('./utils/controller');

const app = new Koa();
// 静态模板
app.context.render = co.wrap(render({
    root: __dirname + "/views",
    autoescape: true,
    cache: false,
    ext: "html"
}));
// 使用koa-body
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
// 设置cors跨域
app.use(cors())
// 设置静态资源
app.use( Static( __dirname + '/static' , {
    prefix:"/public"
}))
// 路由
app.use(controller());
app.listen(1113)