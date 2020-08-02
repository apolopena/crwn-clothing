import React from 'react';

import  { connect } from 'react-redux';

import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';

import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  LeftArrowContainer,
  RightArrowContainer,
  RemoveButtonContainer
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const {name, imageUrl, price, quantity} = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img alt='item' src={imageUrl}/>
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <LeftArrowContainer onClick={() => removeItem(cartItem)}>&#10094;</LeftArrowContainer>
        <span>{quantity}</span>
        <RightArrowContainer onClick={() => addItem(cartItem)}>&#10095;</RightArrowContainer>
      </QuantityContainer>
      <TextContainer>${price}</TextContainer>
      <RemoveButtonContainer onClick={() => clearItem(cartItem)}>&#10005;</RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem:  item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
})
export default connect(null, mapDispatchToProps)(CheckoutItem);