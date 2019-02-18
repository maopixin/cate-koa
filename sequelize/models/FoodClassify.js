const db = require('../db');

module.exports = db.defineModel('foodClassifys', {
    title: db.STRING,
    fid: db.INTEGER,
});