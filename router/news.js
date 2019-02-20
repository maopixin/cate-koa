const model = require('../sequelize/model');
const News = model.News;

const fn_news = async ctx => {
    let data = null;
    let res = null;
    let {id} = ctx.query
    if((id && id>0)){
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
        return true;
    }
    await News.findAll().then(items=>{
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
}

module.exports = [
    {
        type: "GET",
        url: "/api/news",
        middleware: fn_news
    }
]