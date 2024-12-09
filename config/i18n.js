const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['vi', 'en'],
    directory: path.join(__dirname, '../translations'),
    defaultLocale: 'en',
    queryParameter: 'lang',
    autoReload: true,
    syncFiles: false,
});

module.exports = i18n;
