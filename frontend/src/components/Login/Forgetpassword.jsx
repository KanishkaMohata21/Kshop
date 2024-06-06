import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';
import { useAuth } from '../UserContext';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [securityKey, setSecurityKey] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [emptyFields, setEmptyFields] = useState(false);
    const { auth, setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmptyFields(false);
        setErrorMessage('');

        if (!email || !securityKey || !newPassword) {
            setEmptyFields(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/user/forgetpassword', {
                email,
                question: securityKey,
                newPassword,
            });
            console.log('Password reset successful:', response.data);
            // Assuming response contains user data and token for automatic login
            setAuth({ user: response.data.result, token: response.data.token });
            localStorage.setItem('auth', JSON.stringify(response.data));
            setShowPopup(true);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Error resetting password');
            } else {
                setErrorMessage('Request failed: ' + error.message);
            }
        }
    };

    if (showPopup) {
        return <Navigate to="/login" />; // Navigate to home on successful password reset
    }

    return (
        <div className="login-container">
            <div style={{height:'400px'}} className={`login-form-container  ${showPopup ? 'blur-background' : ''}`}>
                <p className="title">Reset Password</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className={`input ${emptyFields || errorMessage ? 'input-error' : ''}`}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className={`input ${emptyFields || errorMessage ? 'input-error' : ''}`}
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        className={`input ${emptyFields || errorMessage ? 'input-error' : ''}`}
                        placeholder="What is your favourite fruit?"
                        value={securityKey}
                        onChange={(e) => setSecurityKey(e.target.value)}
                    />
                    {emptyFields && <p className="error-message">Please fill all fields</p>}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="form-btn">
                        Submit
                    </button>
                </form>
                <p className="sign-up-label">
                    Don't have an account?{' '}
                    <Link to="/register" className="sign-up-link">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
