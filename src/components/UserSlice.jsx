import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    farm_name: '',
    role: 'customer', // Default role
    loading: false,
    error: null,
    success: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action) => { state.name = action.payload; },
        setEmail: (state, action) => { state.email = action.payload; },
        setPassword: (state, action) => { state.password = action.payload; },
        setPhoneNumber: (state, action) => { state.phone_number = action.payload; },
        setFarmName: (state, action) => { state.farm_name = action.payload; },
        setRole: (state, action) => { state.role = action.payload; },
        setLoading: (state, action) => { state.loading = action.payload; },
        setError: (state, action) => { state.error = action.payload; },
        setSuccess: (state, action) => { state.success = action.payload; },
        clearMessages: (state) => {  // Add this action to clear messages
            state.error = null;
            state.success = false;
        },
    },
});

export const {
    setName, setEmail, setPassword, setPhoneNumber, setFarmName, setRole,
    setLoading, setError, setSuccess, clearMessages  // Export the clearMessages action
} = userSlice.actions;

export default userSlice.reducer;
