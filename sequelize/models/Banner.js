const db = require('../db');

module.exports = db.defineModel('banners', {
    url: db.STRING(100)
});