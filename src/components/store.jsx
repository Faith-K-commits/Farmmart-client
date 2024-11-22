// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice'; // Import userSlice

const store = configureStore({
  reducer: {
    auth: authReducer, // auth state
    user: userReducer, // user registration state
  },
});

export default store;
