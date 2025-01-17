// Import necessary modules for creating an Express router and handling user authentication
const express = require('express');
const User = require('../models/user');
const { generateToken } = require('../middlewares/auth');

const router = express.Router();

// Register route to create a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user and generate a token for them
        const user = await User.create({ username, email, password });
        const token = generateToken(user);
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ message: 'Registration failed', error: error.message });
    }
});

// Login route to authenticate a user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        // Check if the user exists and the password is valid
        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a token for the authenticated user
        const token = generateToken(user);
        res.json({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ message: 'Login failed', error: error.message });
    }
});

module.exports = router; // Export the router for use in the main server file