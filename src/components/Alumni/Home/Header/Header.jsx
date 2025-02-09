import React, { useState } from 'react';
import KceLogo from '../../../../assets/images/kce-logo.gif';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({ alumniAuthData, handleLogout }) => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    // Handle login button click to navigate to LandingAlumni page
    const handleLoginClick = () => {
        navigate('/alumni/login'); // Update this path based on your routing setup
    };

    // Handle username click to navigate to the profile page
    const handleProfileClick = () => {
        if (alumniAuthData && alumniAuthData.userId) {
            navigate(`/alumni/profile/${alumniAuthData.userId}`); // Navigate to the user's profile using their ID
        }
    };

    // Handle dropdown visibility toggle
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="custom-navbar">
            <div className="logo-cont">
                <img src={KceLogo} className="kce-logo" alt="KCE Logo" />
                <span className="portal-name">KCE Alumni</span>
            </div>
            <div className="loginbutton">
                {alumniAuthData ? (
                    <div
                        className="user-display slide-in"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="username-display">
                            {alumniAuthData.username}
                        </span>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <div
                                    className="dropdown-item"
                                    onClick={handleProfileClick}
                                >
                                    Profile
                                </div>
                                <div
                                    className="dropdown-item"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="Login-btn" onClick={handleLoginClick}>
                        Login
                    </span>
                )}
            </div>
        </header>
    );
};

export default Header;