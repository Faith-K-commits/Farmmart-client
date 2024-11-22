import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux"; // Import Provider from react-redux
import Navbar from "./components/Navbar";
import AppRoutes from "./components/Routes";
import { logout } from "./components/authSlice";
import store from "./components/store"; // Import your Redux store


const AppWrapper = () => {
  const dispatch = useDispatch();
  const { token, role, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      // Check if the token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(logout()); // Logout if expired
      }
    }
  }, [token, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner if needed
  }

  return (
    <div>
      <header>
        <Navbar isLoggedIn={!!token} role={role} handleLogout={() => dispatch(logout())} />
      </header>
      <AppRoutes isLoggedIn={!!token} role={role} />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppWrapper />
      </Router>
    </Provider>
  );
};

export default App;
