// backend/routes/auth.js
const express = require('express');
const User = require('../models/user');
const { generateToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create({ username, email, password });
        const token = generateToken(user);
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ message: 'Registration failed', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user);
        res.json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ message: 'Login failed', error: error.message });
    }
});

module.exports = router;
