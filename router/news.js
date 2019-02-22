const model = require('../sequelize/model');
const res = require("../utils/response")
const News = model.News;

const fn_news = async ctx => {
    let data = null;
    let {id} = ctx.query
    if((id && id>0)){
        await News.findById(id).then(item=>{
            data = item;
        });
        if(data){
            res(ctx,0,data)
        }else{
            res(ctx,1)
        }
        return true;
    }
    await News.findAll().then(items=>{
        data = items;
    });
    if(data){
        res(ctx,0,data)
    }else{
        res(ctx,1)
    }
}

module.exports = [
    {
        type: "GET",
        url: "/api/news",
        middleware: fn_news
    }
]