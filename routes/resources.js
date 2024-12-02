const express = require('express');
const router = express.Router();

// Render resource management page
router.get('/', (req, res) => {
    res.render('resources');
});

module.exports = router;
