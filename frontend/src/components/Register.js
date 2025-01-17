import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Function to validate password strength
const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
};

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match'); // Check for matching passwords
            setIsError(true);
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.');
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
            console.log('Register response:', response.data); // Debug log
            setMessage('Successfully registered');
            setIsError(false);
            setPasswordError('');
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
            {passwordError && <p className="message error">{passwordError}</p>}
            {message && <p className={isError ? "message error" : "message success"}>{message}</p>}
        </div>
    );
}

export default Register;