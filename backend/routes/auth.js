// Import necessary modules for creating an Express router and handling user authentication
const express = require('express');
const User = require('../models/user');
const { generateToken } = require('../middlewares/auth');

const router = express.Router();

// Register route to create a new user
router.post('/register', async (req, res) => {
    console.log('Registration request body:', req.body); // Log incoming request body for debugging
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ username, email, password });
        const token = generateToken(user);
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ message: 'Registration failed', error: error.errors ? error.errors.map(e => e.message) : error.message });
    }
});

// Login route to authenticate a user
router.post('/login', async (req, res) => {
    console.log('Login request body:', req.body); // Log incoming request body for debugging
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user);
        res.json({ user, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ message: 'Login failed', error: error.message });
    }
});

module.exports = router; // Export the router for use in the main server file