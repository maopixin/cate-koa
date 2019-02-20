const model = require('../sequelize/model');
const AllFood = model.AllFood;

const fn_food = async ctx => {
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
        ctx.body = d;
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
    }
]