const jwt = require("jsonwebtoken");

const fn_login = async ctx=> {
    ctx.body = await ctx.render('login.html',{
        title:"登录"
    })
}
const fn_api_login = async ctx=> {
    let {username,password} = ctx.request.body;
    await Users.find({
        where: {
            username,
            password
        }
    }).then(item=>{
        if(item){
            var jwtTokenSecret = "mpxJwt";
            var token = jwt.sign({username,password}, jwtTokenSecret, {expiresIn: 3600});
            ctx.body = {
                status: {
                    code: 0,
                    msg: "登录成功"
                },
                data: {
                    token,
                    username
                }
            };
        }else{
            ctx.body = {
                status: {
                    code: 1,
                    msg: "账号或密码错误"
                }
            }
        }
    })
}

module.exports = [
    {
        type: "GET",
        url: "/login",
        middleware: fn_login
    },
    {
        type: "POST",
        url: "/api/login",
        middleware: fn_api_login
    }
]