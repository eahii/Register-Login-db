// Import necessary modules for creating an Express router and handling item operations
const express = require('express');
const { Item } = require('../models'); // Import the Item model

const router = express.Router();

// GET route to fetch all items from the database
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll(); // Retrieve all items
        res.json(items); // Send items as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' }); // Handle errors
    }
});

// POST route to add a new item to the database
router.post('/add', async (req, res) => {
    const { name, price } = req.body;

    // Validate request data
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and price are required' });
    }

    try {
        const newItem = await Item.create({ name, price }); // Create a new item
        res.status(201).json(newItem); // Send the created item as a response
    } catch (error) {
        res.status(500).json({ message: 'Failed to add item', error }); // Handle errors
    }
});

// DELETE route to remove an item by its ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id); // Find item by primary key
        if (!item) {
            return res.status(404).json({ message: 'Item not found' }); // Handle item not found
        }
        await item.destroy(); // Delete the item
        res.status(200).json({ message: 'Item deleted successfully' }); // Confirm deletion
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete item', error }); // Handle errors
    }
});

module.exports = router; // Export the router for use in the main server file