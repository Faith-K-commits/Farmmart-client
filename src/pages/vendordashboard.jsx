import React from 'react';
// import { useNavigate } from 'react-router-dom';

const Vendordashboard = () => {
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   // Logic to clear session or authentication tokens
  //   localStorage.removeItem('authToken'); 
  //   sessionStorage.clear(); 
  //   navigate('/login'); 
  // };
  
  return (
    <div>
      <h1>Welcome to the Vendor Dashboard!</h1>
      <p>Thank you for signing up. Enjoy exploring our platform.</p>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Vendordashboard;
