// src/components/About.js
import React from 'react';
import './About.css'; // Import the CSS file for styling

const About = () => {
    return (
        <div className="about-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="nav-logo">
                    Pixelyse
                </div>
                <ul className="nav-links">
                    <li className="nav-item" onClick={() => window.history.back()}>Home</li>
                    <li className="nav-item" onClick={() => window.history.back()}>Dashboard</li>
                    <li className="nav-item" onClick={() => window.history.back()}>About</li>

                    <li className="nav-item" onClick={() => window.history.back()}>Contact</li>
                </ul>
            </nav>
            
            <header className="about-header">
                <h1>About Pixelyse</h1>
                <p>Explore our mission, vision, and cutting-edge technology.</p>
            </header>

            <div className="about-content-section">
                <section className="about-mission">
                    <h2>Our Mission</h2>
                    <p>
                        At Pixelyse, we are committed to empowering individuals, researchers, and organizations 
                        with tools for detecting and analyzing image forgery. Our mission is to enhance digital content
                        integrity through reliable and easy-to-use technology.
                    </p>
                </section>

                <section className="about-technology">
                    <h2>Our Technology</h2>
                    <p>
                        Pixelyse leverages state-of-the-art image processing and AI techniques to offer 
                        accurate forgery detection and localization of tampered regions. Our platform performs 
                        comprehensive analysis on digital images, helping users to identify alterations quickly.
                    </p>
                </section>

                <section className="about-team">
                    <h2>Meet the Team</h2>
                    <p>
                        Our team is comprised of experienced professionals in computer vision, artificial intelligence, 
                        and software engineering. Together, we are dedicated to building secure, user-friendly tools 
                        for the digital age.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
