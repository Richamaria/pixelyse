import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './components/Login'; 

function App() {
    return (
        
        <Router>
            <div className="App">
                <Navbar /> {/* ✅ Navbar is now outside Routes */}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signup" element={<SignUp />} /> {/* ✅ Ensuring SignUp is routed */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/"element={<ProtectedRoute><SignUp/></ProtectedRoute>}/>
                </Routes>
            </div>
        </Router>
        
    );
}

export default App;
