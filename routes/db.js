const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Render settings page
router.get('/settings', (req, res) => {
    res.render('db-settings');
});

// Save database settings
router.post('/settings', (req, res) => {
    const { host, port, user, password, database } = req.body;

    const config = {
        host,
        port,
        user,
        password,
        database,
    };

    fs.writeFileSync(
        path.join(__dirname, '../config/db.json'),
        JSON.stringify(config, null, 2)
    );

    req.flash('success_msg', 'Database settings updated successfully');
    res.redirect('/db/settings');
});

module.exports = router;
