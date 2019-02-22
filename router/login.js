const jwt = require("jsonwebtoken");
const res = require("../utils/response")

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
            res(ctx,0,{token, username})
        }else{
            res(ctx,902)
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