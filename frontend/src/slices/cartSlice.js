import { createSlice } from "@reduxjs/toolkit";

//getItem() -> retrieve the value associated with the key "cart" from the local storage.
const initialState = localStorage.getItem("cart")
  ? JSON.part(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // state-> current state, action -> includes the data to be added to the cart in its payload property
    addToCart: (state, action) => {
      // item to be added to the cart
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i._id === item._id);

      // might need to change logic  ????????????????
      if (existItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      //calculate item price
      state.itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );

      //calculate shipping price

      //calculate tax

      //caculate total
    },
  },
});

export default cartSlice.reducer;
