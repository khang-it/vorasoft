const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username và password là bắt buộc!' });
        }


        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'Đăng ký thành công!', user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Đã xảy ra lỗi!' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};