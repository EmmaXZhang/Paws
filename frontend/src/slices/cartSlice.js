import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utilities/cartUtils";

//getItem() -> retrieve the value associated with the key "cart" from the local storage.
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      payment: "paypal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // state-> current cart state, action -> includes the data(product+quantity) to be added to the cart in its payload property
    addToCart: (state, action) => {
      // payload = product data + quantity
      const itemToAdd = action.payload;
      const existItem = state.cartItems.find((i) => i._id === itemToAdd._id);

      // if item to be added is already in cart, update its detail with itemToAdd, or leave it is
      if (existItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? itemToAdd : i
        );
      } else {
        //ADD new product to cart state
        state.cartItems = [...state.cartItems, itemToAdd];
      }
      // return Cart's updated state -> differen prices
      return updateCart(state);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        //payload = product._id
        (item) => item._id !== action.payload
      );
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});

//cartSlice.actions -> enable other component can use this function.
export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
