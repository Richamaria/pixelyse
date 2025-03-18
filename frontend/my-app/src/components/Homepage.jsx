// src/components/Homepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import Navbar component
import './Homepage.css';

const Homepage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            <Navbar /> 
            <header className="header">
                <h1>Welcome to Pixelyse</h1>
                <p>Your go-to platform for image forgery detection and localization.</p>
            </header>
            
            <div className="content-section">
                <section className="features">
                    <h2>Features</h2>
                    <ul>
                        <li>Upload images to detect forgery</li>
                        <li>Real-time localization of tampered regions</li>
                        <li>Comprehensive analysis of digital content</li>
                    </ul>
                </section>
                
                <section className="get-started">
                    <h2>Get Started</h2>
                    <p>Explore as a guest or sign up to unlock more features!</p>
                    <div className="auth-buttons">
                        
                        <button className="action-btn" onClick={() => navigate('/signup')}>sign up</button>
                        <button className="action-btn login-btn" onClick={() => navigate('/login')}>Login</button>   
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Homepage;
