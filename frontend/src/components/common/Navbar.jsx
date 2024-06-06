import React, { useState } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useAuth } from '../UserContext';
import { CgProfile } from 'react-icons/cg';

export default function Navbar() {
    const { auth, setAuth } = useAuth();
    const [showProfilePopup, setShowProfilePopup] = useState(false); // State to manage profile popup visibility

    // Function to handle logout
    const handleLogout = () => {
        // Clear the authentication state and local storage
        setAuth({ user: null, token: '' });
        localStorage.removeItem('auth');
    };

    // Function to toggle profile popup visibility
    const toggleProfilePopup = () => {
        setShowProfilePopup(!showProfilePopup);
    };

    const handleOkClick = () => {
        setShowProfilePopup(false);
    };

    return (
        <div className='navbar'>
            <h3 className='logo'>KShop</h3>
            <div className="searchAll">
                <input
                    className="search"
                    type="text"
                    name="Search"
                    placeholder="Search"
                />
                <div className="search-icon">
                    <FaMagnifyingGlass />
                </div>
            </div>
            <div className="others">
                {auth.user ? (
                    <>
                        <div className="cart">
                            <FaCartShopping className='FaCartShopping' onClick={toggleProfilePopup} /><sup></sup>
                        </div>
                        <div className="username">{auth.user.name.charAt(0).toUpperCase()}</div>
                        <button className='btn' onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button className='btn'>
                            <Link to="/login" className="">
                                Login
                            </Link>
                        </button>
                    </>
                )}
            </div>
            {/* Profile Popup */}
            {showProfilePopup && (
                <div className="notlogpopup-container" style={{zIndex:100}}> 
                    <div className="notlogpopup">
                        <p className='notlogtext'> You are not Logged In </p>
                        <button onClick={handleOkClick} className="ok-btn">
                            <Link to="/login" style={{textDecoration: 'none', color: 'white' }}>
                                OK
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
