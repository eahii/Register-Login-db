// frontend/src/components/Home.js
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
            fetchProtectedData(token);
        } else {
            setMessage('You are not logged in');
        }
    }, []);

    const fetchProtectedData = async (token) => {
        try {
            await axios.get('http://localhost:5000/api/protected', {
                headers: { 'x-access-token': token }
            });
            setMessage('You are now logged in');
        } catch (error) {
            console.error('Error fetching protected data:', error.response?.data);
            setMessage('Error fetching data');
            setIsLoggedIn(false);
            localStorage.removeItem('token');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setMessage('You have been logged out');
    };

    return (
        <div className="home-container">
            <h2>Home</h2>
            <p className={isLoggedIn ? "message success" : "message error"}>{message}</p>
            {isLoggedIn ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    {/* Button to enter the store */}
                    <Link to="/store">
                        <button>Enter the Store</button>
                    </Link>
                </>
            ) : (
                <div className="auth-buttons">
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Home;
