const model = require('../sequelize/model');
const Team = model.Team;

const fn_team = async ctx => {
    let data = null;
    let {id} = ctx.query
    if((id && id>0)){
        await Team.findById(id).then(item=>{
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
    await Team.findAll().then(items=>{
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
    "GET /api/team": fn_team
}