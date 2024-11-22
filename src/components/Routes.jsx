import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Make sure Navigate is imported
import { useSelector } from "react-redux";

// Page Components
import VendorDashboard from "../pages/Vendordashboard";
import AdminDashboard from "../pages/Admindashboard";
import AnimalsPage from "../pages/AnimalsPage";
import AnimalDetailsPage from "../pages/AnimalDetailsPage";
import Cart from "../pages/CartPage";
import UserTable from "../pages/Users";
import Login from "../pages/Login";
import CustomerRegister from "../pages/CustomerReg";
import VendorRegister from "../pages/VendorReg";
import LandingPage from "../pages/LandingPage"; // Landing page
import CustomerDashboard from "../pages/Customerdasboard";

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(auth.user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Public Routes */}
      {!auth.token && <Route path="/" element={<LandingPage />} />}
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
            <AnimalsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/animal/:id"
        element={
          <ProtectedRoute roles={["vendor", "customer"]}>
            <AnimalDetailsPage />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
