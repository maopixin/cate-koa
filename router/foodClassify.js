const model = require('../sequelize/model');
const FoodClassify = model.FoodClassify;

const fn_foodClassify = async ctx => {
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
}

module.exports = [
    {
        type: "GET",
        url: "/api/foodClassify",
        middleware: fn_foodClassify
    }
]