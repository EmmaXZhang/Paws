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
    //clear user data from local storage
    logout: (state, action) => {
      state.userData = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
