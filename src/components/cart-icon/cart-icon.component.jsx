import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

import './cart-icon.styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon'/>
    <span className='item-count'>{itemCount}</span>
  </div>
);

// Makes the toggleCartHidden action method available as a prop
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = (state) => createStructuredSelector({
  itemCount: selectCartItemsCount
});


export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
 
// This is equivalent 
//export default connect(null, {toggleCartHidden})(CartIcon);
