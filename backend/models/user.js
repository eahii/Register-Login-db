// Import necessary modules from Sequelize, the database configuration, and bcrypt for password hashing
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

// Define the User model using Sequelize's define method
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING, // Define username as a string
        allowNull: false, // Username is required
        unique: true // Username must be unique
    },
    email: {
        type: DataTypes.STRING, // Define email as a string
        allowNull: false, // Email is required
        unique: true, // Email must be unique
        validate: {
            isEmail: true // Validate that the email is in a proper format
        }
    },
    password: {
        type: DataTypes.STRING, // Define password as a string
        allowNull: false // Password is required
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            // Hash the password before creating a new user
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            // Hash the password if it has changed before updating the user
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Add a method to the User model to validate passwords
User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User; // Export the User model for use in other parts of the application