const model = require('../sequelize/model');
const res = require("../utils/response")
const 
    Banner = model.Banner,
    FoodClassify = model.FoodClassify,
    FirstShow = model.FirstShow,
    Server = model.Server,
    News = model.News,
    Friend = model.Friend,
    Team = model.Team;

const fn_home = async ctx => {
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
    await Server.findAll().then(items=>{
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
        res(ctx,0,data)
    }else{
        res(ctx,1,data)
    }
}
module.exports = [
    {
        type: "GET",
        url: "/api/home",
        middleware: [fn_home]
    }
]