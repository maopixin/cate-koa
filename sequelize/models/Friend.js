const db = require('../db');

module.exports = db.defineModel('friend', {
    image: db.STRING,
    url: db.STRING,
});