import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // To redirect after login

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
            console.log("Sending login request:", formData); // Debugging

            const response = await axios.post("http://localhost:8000/api/token/", formData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("Login Response:", response.data);
            
            if (response.status === 200) {
                alert("Login successful!");
                localStorage.setItem("token", response.data.token); // Store token for authentication
                navigate("/dashboard"); // Redirect to dashboard
            }
        } catch (err) {
            console.error("Login Error:", err.response);
            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Invalid username or password. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <nav className="navbar">
                <div className="nav-logo">Pixelyse</div>
                <ul className="nav-links">
                    <li className="nav-item" onClick={() => navigate("/")}>Home</li>
                    <li className="nav-item" onClick={() => navigate('/dashboard')}>Dashboard</li>
                    <li className="nav-item" onClick={() => navigate("/about")}>About</li>
                    <li className="nav-item" onClick={() => navigate("/contact")}>Contact</li>
                </ul>
            </nav>

            <header className="login-header">
                <h1>Login</h1>
                <p>Enter your credentials to access your account.</p>
            </header>

            <div className="login-content-section">
                <form className="login-form" onSubmit={handleSubmit}>
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

                    {/* Display error message */}
                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="signup-link">
                    Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default Login;
