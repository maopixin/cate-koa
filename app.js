const Koa = require("koa");
const Router = require("koa-router");
const Static = require("koa-static-cache");
const cors = require("koa-cors");
const model = require('./sequelize/model');

const app = new Koa();
const router = new Router();

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
app.use(router.routes());
app.listen(1113)