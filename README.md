## 须知

此项目涉及图片，数据。本人未做任何商用，只是学习、参考，追责不要找我。

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
    |   --controller.js <-- 扫描注册路由
    |   |
    |   --decodetoken.js <-- 解析jwt
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