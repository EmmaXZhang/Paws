import { createSlice } from "@reduxjs/toolkit";

//set user authentication to localstorage and remove it
const initialState = {
  //check if there is userData(label name) in local storage
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userData = null;
      // remove the cart from storage so the next
      // logged in user doesn't inherit the previous users cart and shipping
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
