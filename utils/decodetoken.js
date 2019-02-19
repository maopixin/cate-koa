const jwt = require("jsonwebtoken");
module.exports = async (ctx,next) => {
    let token = ctx.query.token || ctx.request.body.token;
    if(token){
        jwt.verify(token, "mpxJwt", function(err,decoded){
            if(err){
                ctx.body = {
                    status:{
                        code: 1,
                        msg: "token信息错误"
                    }
                }
            }else{
                ctx.state.userinfo = decoded;
                next()
            }
        })
    }else{
        ctx.body = {
            status: {
                code: 1,
                msg: "未登录"
            }
        }
    }
}