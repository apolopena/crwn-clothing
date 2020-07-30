import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';



import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items' >
        {
          cartItems.length
            ? cartItems.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
            : (<span className='empty-message'>Your cart is empty</span>)

        }
      </div>
      <CustomButton onClick= {() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

// Make cart items available as props
const mapStateToProps = (state) => createStructuredSelector({
  cartItems: selectCartItems
});

// If we don't pass mapDispatchtoProps to connect(), it will pass the dispatch as props automatically
export default withRouter( connect(mapStateToProps)(CartDropdown) );