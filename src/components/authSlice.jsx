import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example of an async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || 'Login failed');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred during login');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    // Handles logout
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Clear token from storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token); // Store token securely
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Login failed:', action.payload); // Debug log
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
