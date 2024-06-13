import React, { useState } from 'react';
import './Styles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate(); 
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [emptyFields, setEmptyFields] = useState(false); // State to track empty fields

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [securityKey, setSecurityKey] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (!name || !email || !password || !securityKey) {
            setEmptyFields(true);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/user/register', {
                name: name,
                email: email,
                password: password,
                question: securityKey
            });
            console.log('Registration successful:', response.data);
            
            // Show popup on successful registration
            setShowPopup(true);
        } catch (error) {
            if (error.response) {
                console.error('Registration error:', error.response.data);
            } else {
                console.error('Request failed:', error.message);
            }
        }
    };

    // Function to handle OK button click
    const handleOkClick = () => {
        // Hide the popup
        setShowPopup(false);
        
        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div className="create-account-container">
            <div className={`form-container ${showPopup ? 'blur-background' : ''}`}>
                <p className="title">Create an Account</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input"
                        placeholder="What is your favourite fruit"
                        value={securityKey}
                        onChange={(e) => setSecurityKey(e.target.value)}
                    />
                    {emptyFields && <p className="error-message" style={{ textAlign: 'center' }}>Please fill all fields</p>}
                    <button type="submit" className="form-btn">Create Account</button>
                </form>
                <p className="sign-in-label">
                    Already have an account?{' '}
                    <Link to="/login" className="sign-up-link">
                        Login
                    </Link>
                </p>
            </div>
            {showPopup && (
                <div className="popup-container">
                    <div className="popup">
                        <p className='registrationloginSuccess'>Registration successful!</p>
                        <p>Please Login to continue</p>
                        <button className="ok-btn" onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}
