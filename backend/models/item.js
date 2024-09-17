// backend/models/item.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Item extends Model { }

Item.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Item'
});

module.exports = Item;
