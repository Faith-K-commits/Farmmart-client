import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import AppRoutes from "./components/Routes";
import { useAuth } from "./components/UseAuth";


const AppWrapper = () => {
  const { auth, login, logout } = useAuth(); // Using the useAuth hook for login/logout functionality
  const [loading, setLoading] = useState(true); // State for loading

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Use logout function from the useAuth hook
    navigate("/login");
  };

  useEffect(() => {
    if (auth && auth.token) {
      // If token is present, decode and set role
      const decodedToken = JSON.parse(atob(auth.token.split(".")[1]));
      // Check if the token is valid or expired
      if (decodedToken.exp * 1000 < Date.now()) {
        logout(); // Logout if the token is expired
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [auth, logout]); // Ensure this effect runs when the auth object changes

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner while processing
  }

  return (
    <div>
      <header>
      <Navbar isLoggedIn={!!auth} role={auth?.role} handleLogout={handleLogout} />
      </header>
      <AppRoutes isLoggedIn={!!auth} role={auth?.role} />
    </div>
  );
}

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
