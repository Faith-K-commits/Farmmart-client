import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import AppRoutes from './components/Routes';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // New state for user role
  const navigate = useNavigate();

  // Check if user is already logged in by checking a token or session
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage
    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <header>
      <Navbar isLoggedIn={isLoggedIn} role={role} handleLogout={handleLogout} />
      </header>
      <AppRoutes isLoggedIn={isLoggedIn} role={role} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
