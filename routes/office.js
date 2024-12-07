const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('resources', {
        layout: 'classic-office-layout',
        title: 'Office Dashboard',
        menus: [
            { name: 'Home', route: '/' },
            { name: 'File', route: '/office/file' },
            { name: 'Edit', route: '/office/edit' },
            { name: 'Resources', route: '/' },
        ],
    });
});

module.exports = router;