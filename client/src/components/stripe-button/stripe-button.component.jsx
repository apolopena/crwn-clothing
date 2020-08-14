import React from 'react';
import  StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HB3rqJGt8gGJLdfyrpCi4msuK2gj8mbq5ZRCW8NsGASA9Hc6kpFj5moJFUvmTsMagwYxE4YmeEDENFYZyXnlpaQ00cb3MqJCk';
  
  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert('Payment successful');
    }).catch(error => {
      console.log('Payment error: ', error);
      alert(
        'There was an issue with your payment. Please use the test payment information given on the page.'
      );
    });
  }
  
  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/Cuz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
}

export default StripeCheckoutButton;