import { useState } from 'react';

export const useAuth = () => {
  const [auth, setAuth] = useState(() => {
    // Initialize from localStorage
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return token ? { token, role } : null;
  });

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role); // Save role to localStorage
    setAuth({ token, role }); // Set both token and role in state
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove role from localStorage
    setAuth(null); // Clear state
  };

  return { auth, login, logout };
};
