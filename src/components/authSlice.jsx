import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action for login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("https://farmmart-tvco.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "Invalid credentials");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue("An error occurred. Please try again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: JSON.parse(localStorage.getItem("user")) || null,  // Load user from localStorage if available
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");  // Clear user from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        console.log('User from server:', action.payload.user);  // Log the user role
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // Store user in localStorage
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
