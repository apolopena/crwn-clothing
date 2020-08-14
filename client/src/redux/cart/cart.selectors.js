import { createSelector } from 'reselect';

// The cart selectr will work with cart data from the redux store
const selectCart = state => state.cart;

// Memoize selectCart, passes cart to selectItems
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
)
// Now the actual logic
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0)
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc, item) => {
    return acc + (item.quantity * item.price);
  }, 0)
)
