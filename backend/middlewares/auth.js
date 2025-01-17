// Import the jsonwebtoken library for handling JWTs
const jwt = require('jsonwebtoken');

// Function to generate a JWT for a user
const generateToken = (user) => {
    // Sign a token with the user's ID and username, using a secret from environment variables
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 hour
    });
};

// Middleware to verify a JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']; // Get token from request headers

    if (!token) {
        return res.status(403).send({ message: "No token provided!" }); // Handle missing token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" }); // Handle invalid token
        }
        req.userId = decoded.id; // Attach user ID to request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = { generateToken, verifyToken }; // Export the functions for use in routes