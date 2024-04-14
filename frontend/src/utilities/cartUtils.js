export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export function updateCart(state) {
  //calculate items price
  // state.cartItems -> defined in initialState
  // item.price -> THE product's price
  //item.quantity coming from product detail page's quantity
  const itemsPrice = state.cartItems.reduce((acc, item) => acc + (item.price * 100 * item.quantity) / 100, 0);
  state.itemsPrice = addDecimals(itemsPrice);

  //calculate shipping price
  const shippingPrice = itemsPrice > 199 ? 0 : 15;
  state.shippingPrice = addDecimals(shippingPrice);

  //calculate tax (10%)
  const taxPrice = 0.1 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  //caculate total
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimals(totalPrice);

  //store the updated state of the cart in the browser's local storage.
  //when user revisit the page, the state is still there
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
}
