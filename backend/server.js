// Load environment variables from a .env file
require('dotenv').config();

const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware
const db = require('./models'); // Import database models to ensure they are loaded
const authRoutes = require('./routes/auth'); // Import authentication routes
const apiRoutes = require('./routes/api'); // Import API routes
const protectedRoutes = require('./routes/protected'); // Import protected routes
const itemsRouter = require('./routes/items'); // Import item management routes

const app = express(); // Create an Express application
const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 5000

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON parsing for incoming requests

// Set up route handlers
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/api', protectedRoutes);
app.use('/api/items', itemsRouter);

// Sync the database, ensuring all models are loaded
db.sequelize.sync({ force: false }) // Use force: false to avoid dropping tables in production
    .then(() => {
        console.log('Database synced'); // Log success message
    })
    .catch((err) => {
        console.error('Error syncing database:', err); // Log error message
    });

// Define a simple route for the root URL
app.get('/', (req, res) => {
    res.send('Hello from the backend!'); // Send a response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Log server start message
});