import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Admin Dashboard</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <p className="text-lg mb-4">Welcome to the admin dashboard! You can manage users, view analytics, and more.</p>
        <div className="space-y-4">
          <Link to="/admin/users" className="block text-lg text-orange-500 hover:underline">
            Manage Users
          </Link>
          <Link to="/admin/orders" className="block text-lg text-orange-500 hover:underline">
            View Orders
          </Link>
          <Link to="/admin/analytics" className="block text-lg text-orange-500 hover:underline">
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

