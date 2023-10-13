export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calcute items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // calcute shipping  price vi forder > 100 0 : 10
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // calcute text price 15%
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));

  // calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
