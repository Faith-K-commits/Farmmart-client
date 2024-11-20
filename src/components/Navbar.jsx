import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import farmmartLogo from "../assets/farmmart.png";
import { useAuth } from "./UseAuth";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [userRole, setUserRole] = useState(auth?.role); // Local state for role

  useEffect(() => {
    setUserRole(auth?.role); // Update role when auth changes
  }, [auth]); // Dependency on auth to trigger re-render

  return (
    <nav className="bg-orange-500 flex items-center justify-between p-4">
      <img src={farmmartLogo} alt="FarmMart Logo" className="h-10 w-auto" />

      <button
        className="text-white md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-orange-500 md:flex md:static md:w-auto md:space-x-4 items-center`}
      >
        {auth?.token && (
          <>
          {auth.role === "vendor" && (
            <>
              <li>
                <Link to="/vendor/dashboard" className="text-white">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link to="/animals" className="text-white">
                  Animals
                </Link>
              </li>
            </>
          )}
          {auth.role === "customer" && (
            <>
              <li>
                <Link to="/customer/dashboard" className="text-white">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/animals" className="text-white">
                  Animals
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white">
                  Cart
                </Link>
              </li>
            </>
          )}
          {auth.role === "admin" && (
            <>
              <li>
                <Link to="/admin/dashboard" className="text-white">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link to="/users" className="text-white">
                  User Table
                </Link>
              </li>
            </>
          )}
          <li>
            <button
              onClick={logout}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </li>
        </>
      )}

      {/* Non-Authenticated Links */}
      {!auth?.token && (
        <>
          {/* Signup Dropdown */}
          <li
            className="relative text-center"
            onClick={() => setIsSignupOpen(!isSignupOpen)}
          >
            <button className="text-white hover:underline">Signup</button>
            {isSignupOpen && (
              <ul className="absolute bg-white text-black p-2 space-y-2 rounded shadow-md mt-2">
                <li>
                  <Link
                    to="/signup/customer"
                    className="block text-black hover:bg-orange-500 hover:text-white p-2"
                  >
                    Customer Signup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup/vendor"
                    className="block text-black hover:bg-orange-500 hover:text-white p-2"
                  >
                    Vendor Signup
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Login Link */}
          <li>
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  </nav>
);
};

export default Navbar;