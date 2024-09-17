// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            setIsError(true);
            return;
        }
        try {
            console.log('Sending registration data:', { username, email, password });

            const response = await axios.post('http://localhost:5000/api/auth/register', {
                username,
                email,
                password
            });
            console.log('Register response:', response.data); // Add this line for debugging
            setMessage('Successfully registered');
            setIsError(false);
            setTimeout(() => navigate('/'), 2000); // Redirect to home page after 2 seconds
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Something went wrong');
            setIsError(true);
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {message && <p className={isError ? "message error" : "message success"}>{message}</p>}
        </div>
    );
}

export default Register;