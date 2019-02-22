const model = require('../sequelize/model');
const res = require("../utils/response")
const FoodClassify = model.FoodClassify;

const fn_foodClassify = async ctx => {
    let data = null;
    await FoodClassify.findAll().then(items=>{
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
        url: "/api/foodClassify",
        middleware: fn_foodClassify
    }
]