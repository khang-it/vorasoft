const express = require('express');
const router = express.Router();
const { menus } = require('../resources/menu');


router.get('/', (req, res) => {
    res.render('home', {
        layout: 'classic-office-layout',
        title: 'Welcome VoraSoft',
        menus: menus,
    });
});

module.exports = router;