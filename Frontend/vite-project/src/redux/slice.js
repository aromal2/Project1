// src/slices/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  token: null,
  user: null,
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export actions
export const { setToken, setLogout, setUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
