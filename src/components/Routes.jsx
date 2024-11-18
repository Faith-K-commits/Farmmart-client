import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Users from '../pages/Users';
import Vendors from '../pages/Vendors';
import Animals from '../pages/Animals';
import VendorLogin from '../pages/VendorLogin';
import VendorSignup from '../pages/VendorSignup';
import VendorDashboard from '../pages/vendordashboard';

const ProtectedRoute = ({ children, isLoggedIn, role, allowedRoles }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />; // Redirect unauthorized users to the home page
  }
  return children;
};

const AppRoutes = ({ isLoggedIn, role, setIsLoggedIn }) => (
  <Routes>
    <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
    <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
    <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup setIsLoggedIn={setIsLoggedIn} />} />
    <Route path="/VendorSignup" element={isLoggedIn ? <Navigate to="/" /> : <VendorSignup setIsLoggedIn={setIsLoggedIn} />} />
    <Route path="/VendorLogin" element={isLoggedIn ? <Navigate to="/" /> : <VendorLogin setIsLoggedIn={setIsLoggedIn} />} />
    <Route
      path="/users"
      element={
        <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
          <Users />
        </ProtectedRoute>
      }
    />
    <Route
      path="/vendors"
      element={
        <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
          <Vendors />
        </ProtectedRoute>
      }
    />
     <Route path="/vendordashboard" element={isLoggedIn ? <VendorDashboard /> : <Navigate to="/VendorLogin" />} />
    <Route path="/animals" element={isLoggedIn ? <Animals /> : <Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
