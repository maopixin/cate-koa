const model = require('../sequelize/model');
const Banner = model.Banner;

const fn_banner = async ctx => {
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
}

module.exports = {
    "GET /api/banner": fn_banner
}