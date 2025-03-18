// src/components/Contact.js
import React from 'react';
import './Contact.css'; // Import the CSS file for styling

const Contact = () => {
    return (
        <div className="contact-page">
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

            <header className="contact-header">
            <h1>Contact Us</h1>
            <p className="contact-subtext">
                    If you have any questions or feedback, feel free to reach out!
            </p>
            </header>

            <div className="contact-content-section">
                <section className="contact-info">
                    <h2>Our Contact Details</h2>
                    <p><strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a></p>
                    <p><strong>Email:</strong> <a href="mailto:info@pixelyse.com">info@pixelyse.com</a></p>
                    <p><strong>Address:</strong> 1234 Digital Ave, Suite 100, Silicon Valley, CA 98765</p>
                </section>
            </div>
        </div>
    );
};

export default Contact;
