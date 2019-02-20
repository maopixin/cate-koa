// const fn_example = async ctx=> {
//     ctx.body = 1
// }

// 这种配置方式更易于扩展
// module.exports = [
//     {
//         type: "GET", // 请求方法（必填）
//         url: "/example", // 请求路径（必填）
//         middleware: fn_login, // 中间件集合 可以直接是一个函数或者多个函数的的集合[] (必填)
//         isLogin: false, // 是否需要登录 （选填，默认值false）  
//     }
// ]
module.exports = []