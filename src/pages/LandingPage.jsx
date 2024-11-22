// src/pages/LandingPage.js
import React from "react";
import { Link } from "react-router-dom";
import farmmartLogo from "../assets/farmmart.png";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-orange-500 text-white py-12 text-center">
        <img src={farmmartLogo} alt="FarmMart Logo" className="mx-auto h-16 mb-4" />
        <h1 className="text-4xl font-bold">Welcome to FarmMart</h1>
        <p className="mt-4 text-lg">
          Your one-stop platform for buying and selling farm animals.
        </p>
        <div className="mt-6">
          <Link
            to="/signup/customer"
            className="bg-green-500 px-6 py-3 text-white rounded-lg shadow hover:bg-green-700 mr-4"
          >
            Sign Up as a Customer
          </Link>
          <Link
            to="/signup/vendor"
            className="bg-blue-500 px-6 py-3 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Sign Up as a Vendor
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose FarmMart?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-4">For Customers</h3>
            <p>
              Browse and purchase high-quality farm Animals directly from trusted vendors.
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-4">For Vendors</h3>
            <p>
              Expand your reach and sell your Animals to a larger audience effortlessly.
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-4">Easy Management</h3>
            <p>
              Manage your transactions, inventory, and profile seamlessly with our tools.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="bg-gray-900 text-white text-center py-12">
        <h3 className="text-2xl font-bold">Join FarmMart Today</h3>
        <p className="mt-4">
          Whether you're a farmer or a customer, we've got you covered. Join now!
        </p>
        <div className="mt-6">
          <Link
            to="/signup/customer"
            className="bg-green-500 px-6 py-3 text-white rounded-lg shadow hover:bg-green-700 mr-4"
          >
            Get Started
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
