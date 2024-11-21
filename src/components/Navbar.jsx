import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import farmmartLogo from "../assets/farmmart.png";
import { useAuth } from "./UseAuth";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useEffect(() => {
    // No-op if user role changes, handled via `auth` dependency.
  }, [auth]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-orange-500 flex items-center justify-between p-4 shadow-lg z-50">
      {/* Logo */}
      <img src={farmmartLogo} alt="FarmMart Logo" className="h-10 w-auto" />

      {/* Menu Button for Mobile */}
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

      {/* Menu Items */}
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute md:static top-16 left-0 w-full bg-orange-500 md:flex md:space-x-4 items-center md:w-auto text-center`}
      >
        {/* Authenticated Links */}
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
                    Home
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
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/users" className="text-white">
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={logout}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Logout
              </button>
            </li>
          </>
        )}

        {/* Non-Authenticated Links */}
        {!auth?.token && (
          <>
            <li
              className="relative"
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