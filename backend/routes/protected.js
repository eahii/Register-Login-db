// backend/routes/protected.js
const express = require('express');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is protected data' });
});

module.exports = router;
