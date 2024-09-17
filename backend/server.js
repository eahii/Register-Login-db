// backend/server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const protectedRoutes = require('./routes/protected');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', protectedRoutes);

// Sync database
sequelize.sync({ force: true }) // Note: Using force:true will drop tables if they exist
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
