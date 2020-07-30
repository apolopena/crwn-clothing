import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// Grab localstorage from window object
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] /* only reducer we want to persist is cart, user is handled by google auth */
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);