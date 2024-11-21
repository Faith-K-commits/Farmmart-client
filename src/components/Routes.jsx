import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./UseAuth"; // Custom hook for authentication

// Page Components
import VendorDashboard from "../pages/vendordashboard";
import Home from "../pages/Home";
import AdminDashboard from "../pages/Admindashboard";
import AnimalsPage from "../pages/AnimalsPage";
import Cart from "../pages/CartPage";
import UserTable from "../pages/Users";
import Login from "../pages/Login";
import CustomerRegister from "../pages/CustomerReg";
import VendorRegister from "../pages/VendorReg";
import EditProfile from "../pages/EditProfile"; // Add the profile page

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
            <ProtectedRoute roles={["vendor"]}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute roles={["customer"]}>
              <Home />
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
              <AnimalsPage />
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
