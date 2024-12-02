var express = require('express');
var router = express.Router();
const validateUser = require('../middleware/validateUser');
const userController = require('../controllers/userController');

router.post('/register', validateUser, userController.createUser);



//const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { User } = require('../models');


// Configure multer for avatar upload
const upload = multer({ dest: 'uploads/' });

// Render user management page
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.render('users', { users });
});

// Change password
router.post('/change-password', async (req, res) => {
    const { userId, newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { id: userId } });
    req.flash('success_msg', 'Password updated successfully');
    res.redirect('/users');
});

// Upload avatar
router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
    const { userId } = req.body;
    await User.update({ avatar: req.file.path }, { where: { id: userId } });
    req.flash('success_msg', 'Avatar updated successfully');
    res.redirect('/users');
});

module.exports = router;



module.exports = router;


