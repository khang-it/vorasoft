module.exports = {
    ensureAuthenticated: (req, res, next) => {
        //console.log('Current locale:', req?.getLocale());
        if (req.isAuthenticated() || true) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view this resource');
        res.redirect('/auth/login');
    },
};