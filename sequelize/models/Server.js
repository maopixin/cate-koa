const db = require('../db');

module.exports = db.defineModel('service', {
    title: db.STRING,
    describe: db.STRING,
    image: db.STRING,
    content: db.STRING,
});