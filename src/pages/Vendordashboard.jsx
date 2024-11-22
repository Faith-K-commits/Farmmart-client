import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  const { role } = useSelector((state) => state.auth); // Using Redux to get the user role

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Vendor Dashboard</h1>
      
      <div className="text-center mb-6">
        <p className="text-lg">Welcome back, {role}!</p>
      </div>

      {/* Sample Dashboard Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Manage Products</h3>
          <p>View, add, or edit your products</p>
          <Link to="/vendor/products" className="text-blue-500 hover:underline">Go to Products</Link>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Orders</h3>
          <p>Manage customer orders</p>
          <Link to="/vendor/orders" className="text-green-500 hover:underline">Go to Orders</Link>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Profile</h3>
          <p>View and edit your vendor profile</p>
          <Link to="/profile" className="text-yellow-500 hover:underline">Go to Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
