import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import farmmartLogo from '../assets/farmmart.png';

const Navbar = ({ isLoggedIn, role, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-orange-500 flex items-center justify-between p-4">
      {/* Logo */}
      <img src={farmmartLogo} alt="FarmMart Logo" className="h-10 w-auto" />

      {/* Hamburger Menu for Mobile */}
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
          isMenuOpen ? 'block' : 'hidden'
        } absolute top-16 left-0 w-full bg-orange-500 md:flex md:static md:w-auto md:space-x-4 items-center`}
      >
        {isLoggedIn && (
          <>
            <li className="text-center">
              <Link to="/" className="block text-white hover:underline">
                Home
              </Link>
            </li>
            {role === 'admin' && (
              <>
                <li className="text-center">
                  <Link to="/users" className="block text-white hover:underline">
                    Users
                  </Link>
                </li>
                <li className="text-center">
                  <Link to="/vendors" className="block text-white hover:underline">
                    Vendors
                  </Link>
                </li>
              </>
            )}
            <li className="text-center">
              <Link to="/animals" className="block text-white hover:underline">
                Animals
              </Link>
            </li>
          </>
        )}
        {isLoggedIn ? (
          <li className="text-center">
            <button
              onClick={handleLogout}
              className="block bg-white text-green-500 px-3 py-1 rounded hover:bg-green-100"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="text-center">
              <Link to="/login" className="block text-white hover:underline">
                Login
              </Link>
            </li>
            <li className="text-center">
              <Link to="/signup" className="block text-white hover:underline">
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
