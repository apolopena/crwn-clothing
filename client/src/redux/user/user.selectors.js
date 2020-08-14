import { createSelector } from 'reselect';

const selectUser = state => state.user;

// First arg is input selector and can be either an array or multiple arguments. The last arg is the output callback
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
