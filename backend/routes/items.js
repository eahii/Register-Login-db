// backend/routes/items.js
const express = require('express');
const { Item } = require('../models'); // Ensure Item is imported correctly

const router = express.Router();

// GET route to fetch all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// POST route to add a new item
router.post('/add', async (req, res) => {
    const { name, price } = req.body;

    // Validate request
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    try {
        const newItem = await Item.create({ name, price });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add item', error });
    }
});

module.exports = router;
