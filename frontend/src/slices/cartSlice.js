import { createSlice } from "@reduxjs/toolkit";

function addDecimals(value) {
  return (Math.round(value * 100) / 100).toFixed(2);
}

//getItem() -> retrieve the value associated with the key "cart" from the local storage.
// initialState of Order Schema, cartItems = orderItems property in Order Schema
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
      const itemToAdd = action.payload;
      const existItem = state.cartItems.find((i) => i._id === itemToAdd._id);

      // if item to be added is already in cart, update its detail with itemToAdd, or leave it is
      if (existItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existItem._id ? itemToAdd : i
        );
      } else {
        state.cartItems = [...state.cartItems, itemToAdd];
      }

      //calculate items price
      // state.itemsPrice -> Order: itemsPrice property
      // item.price -> item's price and qty in orderItems property in Order schema
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      //calculate shipping price
      state.shippingPrice = addDecimals(state.itemsPrice > 200 ? 0 : 15);
      //calculate tax (10%)
      state.taxPrice = addDecimals(Number((state.itemsPrice * 0.1).toFixed(2)));
      //caculate total
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      //store the updated state of the cart in the browser's local storage.
      //when user revisit the page, the state is still there
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

//cartSlice.actions -> enable other component can use this function.
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
