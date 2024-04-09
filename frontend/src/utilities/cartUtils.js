export function addDecimals(value) {
  return (Math.round(value * 100) / 100).toFixed(2);
}

export function updateCart(state) {
  //calculate items price
  // state.cartItems -> defined in initialState
  // item.price -> THE product's price
  const itemPrice = addDecimals(
    state.cartItems.reduce(
      //item.quantity coming from product detail page's quantity
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  );
  state.itemsPrice = itemPrice;

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

  return state;
}
