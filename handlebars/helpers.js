const helpers = {
    t: (key, ...args) => {
        try {
            const value = i18n.__(key, ...args.slice(-1));
            return value;
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