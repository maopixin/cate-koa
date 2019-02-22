const model = require('../sequelize/model');
const res = require("../utils/response")
const Banner = model.Banner;

const fn_banner = async ctx => {
    let data = null;
    await Banner.findAll().then(items=>{
        data = items;
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
        url: "/api/banner",
        middleware: fn_banner
    }
]