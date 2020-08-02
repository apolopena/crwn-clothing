import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { 
  CartDropdownContainer,
  EmptyMessageContainer,
  CartItemsContainer,
  CartDropdownButton
} from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {
          cartItems.length
            ? cartItems.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
            : (<EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>)

        }
      </CartItemsContainer>
      <CartDropdownButton onClick= {() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}>GO TO CHECKOUT</CartDropdownButton>
    </CartDropdownContainer>
  );
};

// Make cart items available as props
const mapStateToProps = (state) => createStructuredSelector({
  cartItems: selectCartItems
});

// If we don't pass mapDispatchtoProps to connect(), it will pass the dispatch as props automatically
export default withRouter( connect(mapStateToProps)(CartDropdown) );