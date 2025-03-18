// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS for Navbar styling

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="nav-logo" onClick={() => navigate('/')}>
                Pixelyse
            </div>
            <ul className="nav-links">
                <li className="nav-item" onClick={() => navigate('/')}>Home</li>
                <li className="nav-item" onClick={() => navigate('/dashboard')}>Dashboard</li>
                <li className="nav-item" onClick={() => navigate('/about')}>About</li>
                <li className="nav-item" onClick={() => navigate('/contact')}>Contact</li>
            </ul>
        </nav>
    );
};

export default Navbar;
