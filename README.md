## 须知

此项目涉及图片，数据。本人未做任何商用，只是学习、参考，追责不要找我。

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理（`异步处理很强大，很优美`）。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序（`干什么都要下载中间件`）。(摘抄自koa官方网站)

## 美食网站后台
[![image](https://img.shields.io/badge/%E5%8D%9A%E5%AE%A2%E5%9B%AD-%E5%8D%81%E5%B9%B4%E9%9B%AA%E8%90%BD-blue.svg)](https://www.cnblogs.com/maopixin/)

## 如何运行此项目

```bash
git clone https://github.com/maopixin/cate-koa.git
cd cate-koa 
npm i
node app.js //或者使用（supervisor） 帮你自动重启
```
## 目录结构
```
cate_koa
    --layout/ <-- 继承模板
    |
    --router/ <-- 路由文件
    |
    --sequelize/ <-- 数据库相关
    |   |
    |   --config/ <-- 数据库配置文件
    |   |
    |   --models/ <-- 数据库模型文件
    |   |
    |   --db.js <-- 如何定义Model
    |   |
    |   --model.js <-- 如何导入Model
    |   |
    |   --init-db.js <-- 初始化数据库
    |
    --static/ <-- 静态资源文件
    |
    --utils/ <-- 常用工具
    |   |
    |   --code.js <-- 响应代码对应信息
    |   |
    |   --controller.js <-- 扫描注册路由
    |   |
    |   --decodetoken.js <-- 登录中间件
    |   |
    |   --response.js <-- 统一响应对象
    | 
    --views/ <-- html模板文件
    |
    --app.js <-- 业务代码
    |
    --package.json <-- 项目描述文件
```
## 用了些什么？
koa

koa-router 路由

koa-body 解析post发送的body

koa-cors  解决跨域问题（可以通过前端配置代理）（线上应该不会用）

koa-static-cache 静态文件

koa-swig 模板文件（依赖co模块）

sequelize node操作数据库的orm框架（依赖mysql2模块）

jsonwebtoken 登录token加密解密

## 接口文档地址

[传送门](https://www.easyapi.com/api/?documentId=19607&code=food)