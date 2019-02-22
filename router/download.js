const download = require("../utils/download");
const path = require("path");
const root = path.resolve(__dirname, '../');
const fn_download = async (ctx) => {
    download(ctx,"index.js",root+"/socket/");
}
module.exports = [
    {
        type:"GET",
        url:"/download",
        middleware: fn_download
    }
]