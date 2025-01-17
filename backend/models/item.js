// Import necessary modules from Sequelize and the database configuration
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define the Item model extending Sequelize's Model class
class Item extends Model { }

// Initialize the Item model with its attributes and options
Item.init({
    name: {
        type: DataTypes.STRING, // Define name as a string
        allowNull: false // Name is required
    },
    price: {
        type: DataTypes.FLOAT, // Define price as a float
        allowNull: false // Price is required
    }
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'Item' // Name the model 'Item'
});

module.exports = Item; // Export the Item model for use in other parts of the application