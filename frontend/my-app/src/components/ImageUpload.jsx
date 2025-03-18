// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import ImageUpload from './components/ImageUpload'; // Import the new component

function App() {
    return (
        <Router>
            <div className="App">
                {/* Define Routes for navigation */}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<ImageUpload />} /> {/* New route for image upload */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;