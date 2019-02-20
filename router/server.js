const model = require('../sequelize/model');
const Service = model.Service;

const fn_service = async ctx => {
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
}

module.exports = [
    {
        type: "GET",
        url: "/api/service",
        middleware: fn_service
    }
]