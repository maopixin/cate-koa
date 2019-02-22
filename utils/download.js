const fs = require("fs");
const path = require("path");
module.exports = async (ctx, filename, path) => {
    let file = fs.readFileSync(path+filename);

    ctx.set({
        "Content-disposition":"attachment",
        "filename":filename,
        "Content-type":"application/"+path.extname(filename)
    });
    ctx.body = file
}