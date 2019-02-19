const db = require('../db');

module.exports = db.defineModel('users', {
    username: db.STRING,
    password: db.STRING,
    direction: db.STRING,
    gender: db.INTEGER,
});