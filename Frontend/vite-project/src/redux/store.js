// src/store.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice"; // Ensure this path is correct

const store = configureStore({
  reducer: {
    user: userReducer, // Use the default export from the slice file
  },
});

export default store;
