const exphbs = require('express-handlebars');
const path = require('path');
const { helpers } = require('./helpers');

const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: 'layout',
    partialsDir: path.join(__dirname, '../views/partials'),
    layoutsDir: path.join(__dirname, '../views/layouts'),
    helpers: helpers,
});

module.exports = hbs.engine;