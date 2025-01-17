// Import necessary modules for creating an Express router and handling protected routes
const express = require('express');
const { verifyToken } = require('../middlewares/auth'); // Import middleware to verify JWT

const router = express.Router();

// GET route to access protected data
router.get('/protected', verifyToken, (req, res) => {
    // This route is protected by the verifyToken middleware
    res.json({ message: 'This is protected data' }); // Send a response if the token is valid
});

module.exports = router; // Export the router for use in the main server file