const i18n = require('../config/i18n');

const helpers = {
    t: (key, ...args) => {
        try {
            return i18n.__(key, ...args.slice(0, -1));
        } catch (err) {
            return key;
        }
    },
    auto: () => {
        return 'Ok Auto: ' + new Date();;
    },
    upper: (str) => {
        return str?.toUpperCase();
    },
};

module.exports = { helpers };