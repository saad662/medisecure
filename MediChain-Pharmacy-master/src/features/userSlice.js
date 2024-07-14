import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    authenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    LOGIN_USER: (state) => {
      state.authenticated = true;
    },
  },
});

export const { login, logout, LOGIN_USER } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
