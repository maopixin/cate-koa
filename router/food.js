const model = require('../sequelize/model');
const res = require("../utils/response")
const AllFood = model.AllFood;

const fn_food = async ctx => {
    let {id} = ctx.query
    if(!(id && id>0)){
        res(ctx,2)
        return true;
    }
    await AllFood.findById(id).then(item=>{
        if(item){
            res(ctx,0,data)
        }else{
            res(ctx,1,data)
        }
    });
    
}
const fn_add_food = async ctx => {
    ctx.body = await ctx.render('addFood.html',{
        title:"新增食品"
    })
}

const fn_food_add = async ctx => {
    let {title,introduce,image,type} = ctx.request.body;
    await AllFood.create({
        title,
        introduce,
        image,
        type
    }).then(d => {
        res(ctx,0,d)
    })
}

const fn_food_get = async ctx => {
    let {id} = ctx.query;
    if(!id){
        res(ctx,2,data);
    }
    await AllFood.findById(id).then(item=>{
        if(item){
            res(ctx,0,data);
        }
    })
}

module.exports = [
    {
        type: "GET",
        url: "/api/food",
        middleware: fn_food
    },
    {
        type: "GET",
        url: "/admin/food",
        middleware: fn_add_food
    },
    {
        type: "GET",
        url: "/food/add",
        middleware: fn_food_add
    },
    {
        type:"GET",
        url: "/api/getFood",
        middleware: fn_food_get
    }
]