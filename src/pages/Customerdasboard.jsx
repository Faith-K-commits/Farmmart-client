import React from "react";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Customer Dashboard</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">Welcome to your dashboard!</p>
        <div className="space-y-4">
          <Link to="/profile" className="block text-lg text-orange-500 hover:underline">
            View Profile
          </Link>
          <Link to="/orders" className="block text-lg text-orange-500 hover:underline">
            Order History
          </Link>
          <Link to="/settings" className="block text-lg text-orange-500 hover:underline">
            Account Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

