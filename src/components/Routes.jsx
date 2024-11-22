import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Page Components
import VendorDashboard from "../pages/Vendordashboard";
import CustomerDashboard from "../pages/Customerdasboard"; // Updated from Home
import AdminDashboard from "../pages/Admindashboard";
import AnimalsPage from "../pages/AnimalsPage";
import Cart from "../pages/CartPage";
import UserTable from "../pages/Users"; // Updated from Users
import Login from "../pages/Login";
import CustomerRegister from "../pages/CustomerReg";
import VendorRegister from "../pages/VendorReg";
import EditProfile from "../pages/EditProfile";

// Role Constants
const ROLES = {
  VENDOR: "vendor",
  CUSTOMER: "customer",
  ADMIN: "admin",
};

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup/customer" element={<CustomerRegister />} />
      <Route path="/signup/vendor" element={<VendorRegister />} />

      {/* Profile Route */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/vendor/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.VENDOR]}>
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/animals"
        element={
          <ProtectedRoute allowedRoles={[ROLES.VENDOR, ROLES.CUSTOMER]}>
            <AnimalsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <UserTable />
          </ProtectedRoute>
        }
      />

      {/* Redirect to Login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
