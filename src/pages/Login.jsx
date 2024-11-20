// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../components/UseAuth';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth(); // Access login function from useAuth
//   const navigate = useNavigate();

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await fetch('http://127.0.0.1:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         login(data.token, data.role); // Pass both token and role to the login function
//         navigate('/'); // Redirect to home after successful login
//       } else {
//         setError(data.error || 'Invalid login credentials.');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//           >
//             Login
//           </button>
//           <p className="text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/signup" className="text-orange-500 hover:underline">
//               Sign up here
//             </Link>
//           </p>
//           <p className="text-center text-sm text-gray-600">
//             Looking to sell?{' '}
//             <Link to="/VendorLogin" className="text-orange-500 hover:underline">
//               Sign in here
//             </Link>
//           </p>
//         </form>
//         {error && (
//           <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/UseAuth"; // Import useAuth hook

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router hook for redirection
  const { login } = useAuth(); // Access the login function from useAuth

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Invalid credentials");
        return;
      }

      const data = await response.json();

      // Store the JWT token in localStorage and manage auth state
      login(data.token, data.user.role); // Login using useAuth

      // Redirect the user based on their role
      switch (data.user.role) {
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
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
