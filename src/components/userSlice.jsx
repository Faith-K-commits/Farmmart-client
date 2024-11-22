// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  role: 'customer', // default role can be set to customer
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setRole,
  setLoading,
  setError,
  setSuccess,
  clearMessages,
} = userSlice.actions;

export default userSlice.reducer;
