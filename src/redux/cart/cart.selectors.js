import { createSelector } from 'reselect';


const selectCart = state => state.cart;

// Memoize selectCart, passes cart to selectItems
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0)

)