import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_USER_ACTIVE: (state, action) => {
      // console.log(action.payload);
      const { email, userName, userId } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
    },
    removeActiveUser: (state, action) => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
      console.log(state.isLoggedIn);
    },
  },
});

export const { SET_USER_ACTIVE, removeActiveUser } = authSlice.actions;
export const selectIsloggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
console.log(selectUserName);
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
