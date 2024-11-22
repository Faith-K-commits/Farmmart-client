import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../components/authSlice"; // Redux action for login

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const { user, token, loading } = authState;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    // Dispatch login action
    const result = await dispatch(loginAsync(formData));
    if (loginAsync.rejected.match(result)) {
      setError(result.payload || "Invalid credentials");
      return;
    }
  };

  useEffect(() => {
    if (!loading && user) {
      switch (user.role) {
        case "vendor":
          navigate("/vendor/dashboard");
          break;
        case "customer":
          navigate("/customer/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          setError("Unknown user role");
      }
    }
  }, [user, loading, navigate]); // Trigger only when user or loading state changes

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <label className="block text-gray-700 font-medium mb-2">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Login
          </button>
        </form>
        {loading && <p className="text-blue-500 mt-4">Logging in...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
