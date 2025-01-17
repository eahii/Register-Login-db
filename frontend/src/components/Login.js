import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchProtectedData(token); // Fetch data if user is logged in
        } else {
            setMessage('You are not logged in'); // Set message if not logged in
        }
    }, []);

    const fetchProtectedData = async (token) => {
        try {
            await axios.get('http://localhost:5000/api/protected', {
                headers: { 'x-access-token': token }
            });
            setMessage('You are now logged in'); // Update message on successful data fetch
        } catch (error) {
            console.error('Error fetching protected data:', error.response?.data);
            setMessage('Error fetching data'); // Update message on error
            setIsLoggedIn(false);
            localStorage.removeItem('token'); // Remove token on error
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token on logout
        setIsLoggedIn(false);
        setMessage('You have been logged out'); // Update message on logout
    };

    return (
        <div className="home-container">
            <h2>Home</h2>
            <p className={isLoggedIn ? "message success" : "message error"}>{message}</p>
            {isLoggedIn ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <Link to="/store">
                        <button>Enter the Store</button> {/* Navigate to store if logged in */}
                    </Link>
                </>
            ) : (
                <div className="auth-buttons">
                    <Link to="/register">
                        <button>Register</button> {/* Navigate to register page */}
                    </Link>
                    <Link to="/login">
                        <button>Login</button> {/* Navigate to login page */}
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Home;