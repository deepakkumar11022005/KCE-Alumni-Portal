import React from 'react';
import KceLogo from '../../../../assets/images/kce-logo.gif';
import './Header.css';

const Header = () => {
    return (
        <header className="custom-navbar">
            <div className='logo-cont'>
                <img src={KceLogo} className="kce-logo" alt="KCE Logo" />
                <span className="portal-name">KCE Alumni</span>
            </div>
            <div className='loginbutton'>
                <span className='Login-btn'>Login</span>
                {/* <FaArrowRight className='rightarrow' /> */}
            </div>
        </header>
    );
};

export default Header;
