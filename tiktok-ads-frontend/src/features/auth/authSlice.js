import { createSlice } from "@reduxjs/toolkit";

// 🔑 Read token from localStorage ONCE at initialization
const token = localStorage.getItem("access_token");

const initialState = {
  accessToken: token,
  isConnected: Boolean(token),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.accessToken = action.payload;
      state.isConnected = true;

      // store token (allowed by assignment)
      localStorage.setItem("access_token", action.payload);
    },
    logout(state) {
      state.accessToken = null;
      state.isConnected = false;

      // clear token
      localStorage.removeItem("access_token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
