import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/UseAuth"; // Import useAuth hook

const ProtectedRoute = ({ children, requiredRole }) => {
  const { auth } = useAuth(); // Access auth state from useAuth hook
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // If no token exists or role doesn't match, the user is not authorized
    if (!auth || auth.role !== requiredRole) {
      setLoading(false);
      setIsAuthorized(false);
      return;
    }

    // Check token expiry if token exists
    const verifyToken = async () => {
      try {
        const { default: jwtDecode } = await import("jwt-decode");
        const decodedToken = jwtDecode(auth.token);

        // Check token expiry
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setLoading(false);
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
          setLoading(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setLoading(false);
        setIsAuthorized(false);
      }
    };

    if (auth.token) {
      verifyToken();
    } else {
      setLoading(false);
      setIsAuthorized(false);
    }
  }, [auth, requiredRole]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loader component
  }

  if (!isAuthorized) {
    return <Navigate to={auth ? "/unauthorized" : "/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
