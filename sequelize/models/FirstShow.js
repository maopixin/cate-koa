const db = require('../db');

module.exports = db.defineModel('firstShow', {
    title: db.STRING,
    introduce: db.STRING,
    image: db.STRING,
    type: db.INTEGER,
});