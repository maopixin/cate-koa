const db = require('../db');

module.exports = db.defineModel('allFoods', {
    title: db.STRING(100),
    introduce: db.STRING(100),
    image: db.STRING(100),
    type: db.INTEGER(100),
});