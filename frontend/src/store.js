import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";

const store = configureStore({
  //specify the reducer which will be used to manage the state
  // reducer:how the state changes in response to dispatched actions.
  //use a reducer provided by apiSlice and associating it with a specific slice of state identified by apiSlice.reducerPath.
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
