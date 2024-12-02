const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../middleware/auth');

// Login page
router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        req.flash('info_msg', 'You are already logged in');
        return res.redirect('/');
    }
    res.render('login');
});

// Login handler
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
    }),
    (req, res) => {

        req.session.user = { username: req.user.email };
        res.redirect('/');
    }
);

// Logout handler
router.get('/logout', (req, res) => {
    console.log('logout:', req.session);
    req.logout(err => {
        if (err) return next(err);
        req.flash('success_msg', 'You are logged out');
        res.redirect('/auth/login');
    });

    // req.session.destroy((err) => {
    //     if (err) {
    //       return res.redirect('/home');
    //     }
    //     res.redirect('/login');
    //   });
});

// Google login
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    (req, res) => res.redirect('/main')
);

module.exports = router;
