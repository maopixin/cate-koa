const Koa = require("koa");
const Router = require("koa-router");
const Static = require("koa-static-cache");
const cors = require("koa-cors");
const model = require('./sequelize/model');
const fs = require("fs")
const path = require("path");
const koaBody = require('koa-body');
const render = require("koa-swig");
const co = require('co');


const app = new Koa();
const router = new Router();
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
// 引入model
let Banner = model.Banner,
    FirstShow = model.FirstShow,
    FoodClassify = model.FoodClassify,
    Service = model.Service,
    News = model.News,
    Team = model.Team,
    Friend = model.Friend,
    AllFood = model.AllFood;

// 设置cors跨域
app.use(cors())
// 设置静态资源
app.use( Static( __dirname + '/static' , {
    prefix:"/public"
}))
// banner
router.get("/api/banner" ,async ctx => {
    let data = null;
    await Banner.findAll().then(items=>{
        data = items;
    });
    if(data){
        ctx.body = {
            status:{
                code:0,
                msg:"成功"
            },
            data
        }
    }else{
        ctx.body = {
            status:{
                code:1,
                msg:"失败"
            },
        }
    }
})
router.get("/api/team" ,async ctx => {
    let data = null;
    let {id} = ctx.query
    if((id && id>0)){
        await Team.findById(id).then(item=>{
            data = item;
        });
        if(data){
            ctx.body = {
                status:{
                    code:0,
                    msg:"成功"
                },
                data
            }
        }else{
            ctx.body = {
                status:{
                    code:1,
                    msg:"数据不存在"
                },
            }
        }
        return true;
    }
    await Team.findAll().then(items=>{
        data = items;
    });
    if(data){
        ctx.body = {
            status:{
                code:0,
                msg:"成功"
            },
            data
        }
    }else{
        ctx.body = {
            status:{
                code:1,
                msg:"失败"
            },
        }
    }
})
// 分类
router.get("/api/foodClassify" ,async ctx => {
    let data = null;
    await FoodClassify.findAll().then(items=>{
        data = items;
    });
    if(data){
        ctx.body = {
            status:{
                code:0,
                msg:"成功"
            },
            data
        }
    }else{
        ctx.body = {
            status:{
                code:1,
                msg:"失败"
            },
        }
    }
})
// 首页全部
router.get("/api/home" ,async ctx => {
    let data = {
        banners:{},
        products: {
            title:"菜品",
            title_en:"PRODUCTS"
        },
        service: {
            title:"服务",
            title_en:"SERVICE"
        },
        news: {
            title: "新闻",
            title_en: "NEWS"
        },
        team: {
            title: "团队",
            title_en: "TEAM"
        },
        friend: {
            title: "合作伙伴",
            title_en: "OUR PARTNER"
        }
    };
    await Banner.findAll().then(banners=>{
        data.banners = banners;
    });
    await FoodClassify.findAll({
        attributes: ['id', 'title'],
        where: {fid: 0}
    }).then(foodClassifys=>{
        data.products.navs = foodClassifys;
    });
    await FirstShow.findAll({
        attributes: { exclude: ['type'] }
    }).then(firstShows=>{
        data.products.foods = firstShows;
    });
    await Service.findAll().then(items=>{
        data.service.shows = items;
    });
    await News.findAll({
        attributes: { exclude: ['content'] }
    }).then(items=>{
        data.news.news = items;
    });
    await Team.findAll({
        attributes: { exclude: ['content'] }
    }).then(items=>{
        data.team.team = items;
    });
    await Friend.findAll().then(items=>{
        data.friend.friend = items;
    });
    if(data){
        ctx.body = {
            status:{
                code:0,
                msg:"成功"
            },
            data
        }
    }else{
        ctx.body = {
            status:{
                code:1,
                msg:"失败"
            },
        }
    }
})
// 获取服务
router.get("/api/server" ,async ctx => {
    let data = null;
    let res = null;
    let {id} = ctx.query
    if(!(id && id>0)){
        ctx.body = {
            status: {
                code: 1,
                msg:　"id不能为空"
            }
        };
        return true;
    }
    await Service.findById(id).then(item=>{
        data = item;
    });
    if(data){
        ctx.body = {
            status:{
                code:0,
                msg:"成功"
            },
            data
        }
    }else{
        ctx.body = {
            status:{
                code:1,
                msg:"数据不存在"
            },
        }
    }
})
// 获取菜品
router.get("/api/food" ,async ctx => {
    let data = null;
    let res = null;
    let {id} = ctx.query
    if(!(id && id>0)){
        ctx.body = {
            status: {
                code: 1,
                msg:　"id不能为空"
            }
        };
        return true;
    }
    await AllFood.findById(id).then(item=>{
        data = item;
    });
    if(data){
        ctx.body = {
            status:{
                code:0,
                msg:"成功"
            },
            data
        }
    }else{
        ctx.body = {
            status:{
                code:1,
                msg:"数据不存在"
            },
        }
    }
})
// 获取新闻
router.get("/api/news" ,async ctx => {
    let data = null;
    let res = null;
    let {id} = ctx.query
    if(!(id && id>0)){
        ctx.body = {
            status: {
                code: 1,
                msg:　"id不能为空"
            }
        };
        return true;
    }
    await News.findById(id).then(item=>{
        data = item;
    });
    if(data){
        ctx.body = {
            status:{
                code:0,
                msg:"成功"
            },
            data
        }
    }else{
        ctx.body = {
            status:{
                code:1,
                msg:"数据不存在"
            },
        }
    }
})
// 添加食品页面
router.get("/admin/food",async ctx => {
    ctx.body = await ctx.render('addFood.html',{
        title:"新增食品"
    })
})
// 文件上传
router.post("/upload",async ctx => {
    const file = ctx.request.files.file;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    var myDate = new Date();
    var newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
    var targetPath = path.join(__dirname, './static/image/img') + `/${newFilename}`;
    //创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    //返回保存的路径
    return ctx.body = { status:{
        code:0,
        msg:"成功"
    }, data: { url: 'http://' + ctx.headers.host + '/public/image/img/' + newFilename } };
})
// 添加食品接口
router.post("/food/add",async ctx => {
    let {title,introduce,image,type} = ctx.request.body;
    await AllFood.create({
        title,
        introduce,
        image,
        type
    }).then(d => {
        ctx.body = d;
    })
})

app.use(router.routes());
app.listen(1113)