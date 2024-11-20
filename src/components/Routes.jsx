// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Home from '../pages/Home';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import Users from '../pages/Users';
// import Vendors from '../pages/Vendors';
// import Animals from '../pages/Animals';
// import VendorLogin from '../pages/VendorLogin';
// import VendorSignup from '../pages/VendorSignup';
// import VendorDashboard from '../pages/vendordashboard';

// const ProtectedRoute = ({ children, isLoggedIn, role, allowedRoles }) => {
//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }
//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/" />; // Redirect unauthorized users to the home page
//   }
//   return children;
// };

// const AppRoutes = ({ isLoggedIn, role, setIsLoggedIn }) => (
//   <Routes>
//     <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
//     <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
//     <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup setIsLoggedIn={setIsLoggedIn} />} />
//     <Route path="/VendorSignup" element={isLoggedIn ? <Navigate to="/" /> : <VendorSignup setIsLoggedIn={setIsLoggedIn} />} />
//     <Route path="/VendorLogin" element={isLoggedIn ? <Navigate to="/" /> : <VendorLogin setIsLoggedIn={setIsLoggedIn} />} />
//     <Route
//       path="/users"
//       element={
//         <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
//           <Users />
//         </ProtectedRoute>
//       }
//     />
//     <Route
//       path="/vendors"
//       element={
//         <ProtectedRoute isLoggedIn={isLoggedIn} role={role} allowedRoles={['admin']}>
//           <Vendors />
//         </ProtectedRoute>
//       }
//     />
//      <Route path="/vendordashboard" element={isLoggedIn ? <VendorDashboard /> : <Navigate to="/VendorLogin" />} />
//     <Route path="/animals" element={isLoggedIn ? <Animals /> : <Navigate to="/login" />} />
//   </Routes>
// );

// export default AppRoutes;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth"; // Custom hook for authentication

// Page Components
import VendorDashboard from "../pages/Vendordashboard";
import CustomerDashboard from "../pages/Customerdashboard";
import AdminDashboard from "../pages/Admindashboard";
import Animals from "../pages/Animals";
import Cart from "../pages/CartPage";
import UserTable from "../pages/Users";
import Login from "../pages/Login";
import CustomerRegister from "../pages/CustomerReg";
import VendorRegister from "../pages/VendorReg";

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <>

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup/customer" element={<CustomerRegister />} />
        <Route path="/signup/vendor" element={<VendorRegister />} />

        {/* Protected Routes */}
        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute roles={["vendor"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute roles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/animals"
          element={
            <ProtectedRoute roles={["vendor", "customer"]}>
              <Animals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute roles={["customer"]}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute roles={["admin"]}>
              <UserTable />
            </ProtectedRoute>
          }
        />

        {/* Redirect to default route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
