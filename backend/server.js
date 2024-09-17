require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const db = require('./models'); // Import db from models to ensure all models are loaded
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const protectedRoutes = require('./routes/protected');
const itemsRouter = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', protectedRoutes);
app.use('/api/items', itemsRouter);

// Sync database (Consider removing force: true in production)
db.sequelize.sync({ force: false }) // Use force: false in production
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
