import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
  //use a reducer provided by apiSlice and associating it with a specific slice of state identified by apiSlice.reducerPath.
  reducer: {
    // apiSlice.reducer -> will response to fetch/mutate action, then update state
    // [apiSlice.reducerPath] -> a label for the piece of the state.
    [apiSlice.reducerPath]: apiSlice.reducer,

    // add more new reducers from slice
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
