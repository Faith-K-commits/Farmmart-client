import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../components/UseAuth";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { auth } = useAuth(); // Access authentication state
  const [loading, setLoading] = useState(true); // Loading state
  const [isAuthorized, setIsAuthorized] = useState(false); // Authorization state

  useEffect(() => {
    // Check if the user is authenticated and has the required role
    if (!auth || (requiredRole && ![].concat(requiredRole).includes(auth.role))) {
      setLoading(false);
      setIsAuthorized(false);
      return;
    }

    // If token exists, check expiration
    if (auth.token) {
      try {
        const decodedToken = JSON.parse(atob(auth.token.split(".")[1]));
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired, clear auth state
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch {
        // Handle invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsAuthorized(false);
      }
    } else {
      setIsAuthorized(false);
    }
    setLoading(false); // Mark loading as false after checks
  }, [auth, requiredRole]);

  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loader component
  }

  if (!isAuthorized) {
    return <Navigate to={auth ? "/unauthorized" : "/login"} replace />;
  }

  return children; // Render protected content if authorized
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // The component(s) to render
  requiredRole: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // Role(s) required to access this route
};

export default ProtectedRoute;
