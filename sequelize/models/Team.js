const db = require('../db');

module.exports = db.defineModel('teams', {
    name: db.STRING,
    name_en: db.STRING,
    position: db.STRING,
    synopsis: db.STRING,
    content: db.TEXT,
    image_small: db.STRING,
    image_big: db.STRING,
});