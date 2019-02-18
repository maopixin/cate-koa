const db = require('../db');

module.exports = db.defineModel('news', {
    title: db.STRING,
    describe: db.STRING,
    content: db.TEXT,
    cover: db.TEXT,
});