import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // To redirect after successful signup

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log("Sending request to API:", formData);
            const response = await axios.post('http://localhost:8000/api/user/register/', formData, {
                headers: { "Content-Type": "application/json" },
                // Removed withCredentials since it's not always needed
            });
            
            console.log("Response:", response.data);
            if (response.status === 201) {
                alert('Registration successful! Please log in.');
                navigate('/login'); // Redirect to login page
            }
        } catch (err) {
            console.error('Error:', err.response);
            // Improved error handling
            setError(
                err.response?.data?.message || 
                err.response?.data?.error || 
                err.message || 
                "An error occurred. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="nav-logo">Pixelyse</div>
                <ul className="nav-links">
                    <li className="nav-item" onClick={() => navigate('/')}>Home</li>
                    <li className="nav-item" onClick={() => navigate('/dashboard')}>Dashboard</li>
                    <li className="nav-item" onClick={() => navigate('/about')}>About</li>
                    <li className="nav-item" onClick={() => navigate('/contact')}>Contact</li>
                </ul>
            </nav>

            <header className="signup-header">
                <h1>Sign Up</h1>
                <p>Create an account to access our features.</p>
            </header>

            <div className="signup-content-section">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required 
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />

                    {/* Error message display */}
                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
