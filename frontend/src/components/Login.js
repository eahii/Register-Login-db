// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending login data:', { username, password }); // Debug log
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            });
            console.log('Login response:', response.data); // Debug log
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                setMessage('Login successful');
                setIsError(false);
                setTimeout(() => navigate('/'), 1000); // Redirect to home page after 1 second
            } else {
                throw new Error('No token received');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Invalid username or password');
            setIsError(true);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p className={isError ? "message error" : "message success"}>{message}</p>}
        </div>
    );
}

export default Login;
