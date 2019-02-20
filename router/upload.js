const fs = require("fs");

const fn_upload = async ctx => {
    const file = ctx.request.files.file;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    var myDate = new Date();
    var newFilename = myDate.getTime()+'.'+file.name.split('.')[1];
    var targetPath = path.join(__dirname, './static/image/img') + `/${newFilename}`;
    //创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    //返回保存的路径
    return ctx.body = { status:{
        code:0,
        msg:"成功"
    }, data: { url: 'http://' + ctx.headers.host + '/public/image/img/' + newFilename } };
}

module.exports = [
    {
        type: "POST",
        url: "/api/upload",
        middleware: fn_upload,
        isLogin: true
    }
]