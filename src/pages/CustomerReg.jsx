// CustomerRegister.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setPassword, setRole, setLoading, setError, setSuccess, clearMessages } from '../components/userSlice'; // Ensure correct path
import { useNavigate } from 'react-router-dom'; // To redirect after successful registration

const CustomerRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Redirect after successful registration

  const { name, email, password, role, loading, error, success } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(clearMessages()); // Clear any previous messages before submitting

    try {
      const response = await fetch('https://farmmart-tvco.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const result = await response.json();
      if (response.ok) {
        dispatch(setSuccess(true));
        dispatch(setError(null));
        navigate('/login'); // Redirect to login page on success
      } else {
        dispatch(setError(result.error || 'Registration failed'));
      }
    } catch (err) {
      dispatch(setError('An error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Register as Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-gray-700 font-medium mb-2">Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <label className="block text-gray-700 font-medium mb-2">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <label className="block text-gray-700 font-medium mb-2">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-orange-500">Register</button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Registration Successful!</p>}
      </form>
    </div>
    </div>
  );
};

export default CustomerRegister;
