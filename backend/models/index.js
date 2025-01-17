'use strict';

// Import necessary modules for file system operations, path handling, and Sequelize ORM
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // Determine the environment (development by default)
const config = require(__dirname + '/../config/config.json')[env]; // Load database configuration based on environment
const db = {}; // Initialize an empty object to store models

let sequelize;
if (config.use_env_variable) {
  // If a database URL is provided in environment variables, use it to connect
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Otherwise, use the configuration details from the config file
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the current directory and filter out non-JS files and the current file
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Ignore hidden files
      file !== basename && // Ignore this file
      file.slice(-3) === '.js' && // Only consider JavaScript files
      file.indexOf('.test.js') === -1 // Ignore test files
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)); // Import each model file
    if (model.prototype instanceof Sequelize.Model) {
      // If the model is class-based, add it to the db object
      db[model.name] = model;
    } else if (typeof model === 'function') {
      // If the model is function-based, initialize it with sequelize and DataTypes
      db[model.name] = model(sequelize, DataTypes);
    }
  });

// Set up associations between models if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add sequelize and Sequelize to the db object for external access
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; // Export the db object containing all models and sequelize instance