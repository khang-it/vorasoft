const express = require('express');
const router = express.Router();
// const { menus } = require('../resources/menu');
// , {
//     layout: 'classic-office-layout',
//     title: 'Welcome VoraSoft',
//     menus: menus,
//     hideToolbar: menus?.settings?.hideToolbar,
// }


router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;