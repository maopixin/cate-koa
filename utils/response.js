const codes = require("./code");
module.exports = function(ctx,code,data=null){
    ctx.body = {
        status: {
            code,
            msg: codes[code]
        },
        data
    }
}