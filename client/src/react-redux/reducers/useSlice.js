import { createSlice } from "@reduxjs/toolkit";

// Initial state of the user slice
const initialState = {
  currentUser: null, // Initially no user is logged in
};

// Create a user slice with actions and reducers
export const userSlice = createSlice({
  name: "user", // Slice name
  initialState, // Initial state defined above
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user; // Update current user in state
      localStorage.setItem("fittrack-app-token", action.payload.token); // Store token in local storage
    },
    // Action to handle logout
    logout: (state) => {
      state.currentUser = null; // Clear current user from state
      localStorage.removeItem("fittrack-app-token"); // Remove token from local storage
    },
  },
});

// Export action creators
export const { loginSuccess, logout } = userSlice.actions;

// Export reducer function
export default userSlice.reducer;
