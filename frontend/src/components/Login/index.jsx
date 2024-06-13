import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate
import './styles.css';
import axios from 'axios';
import { useAuth } from '../UserContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [emptyFields, setEmptyFields] = useState(false);
    const {auth,setAuth} = useAuth()

   const handleSubmit = async (e) => {
    e.preventDefault();
    setInvalidEmail(false);
    setInvalidPassword(false);
    setEmptyFields(false);

    if (!email || !password) {
        setEmptyFields(true);
        return;
    }

    try {
        const response = await axios.post('http://localhost:8000/api/user/login', {
            email: email,
            password: password,
        });
        console.log('Login successful:', response.data);
        setAuth({ user: response.data.result, token: response.data.token });
        localStorage.setItem('auth', JSON.stringify(response.data));   
        // Show popup on successful login
        setShowPopup(true);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Invalid email or password
            setInvalidEmail(true);
            setInvalidPassword(true);
        } else {
            console.error('Request failed:', error.message);
        }
    }
};


    return (
        <div className="login-container">
            <div className={`login-form-container ${showPopup ? 'blur-background' : ''}`}>
                <p className="title">Welcome back</p>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className={`input ${invalidEmail ? 'input-error' : ''}`}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className={`input ${invalidPassword ? 'input-error' : ''}`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {invalidPassword && <p className="error-message" style={{ color: 'red', textAlign: 'center' }}>Invalid email or password</p>}
                    {emptyFields && <p className="error-message" style={{ textAlign: 'center' }}>Please fill all fields</p>}
                    <p className="page-link">
                        <Link to = '/forgetpassword'>
                        <span className="page-link-label">Forgot Password?</span>
                        </Link>
                    </p>
                    <button type="submit" className="form-btn">
                        Login
                    </button>
                </form>
                <p className="sign-up-label">
                    Don't have an account?{' '}
                    <Link to="/register" className="sign-up-link">
                        Register
                    </Link>
                </p>
            </div>
            {showPopup && (
                <div className="popup-container">
                    <div className="popup">
                        <p className='registrationloginSuccess'>Login successful!</p>
                        <button className="ok-btn" >
                            <Link to="/" style={{ textDecoration: 'none', color: 'white' }} >
                                OK
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
