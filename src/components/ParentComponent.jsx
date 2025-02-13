import React, { useState } from 'react';
import Checkout from './Checkout'; 

const ParentComponent = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 20, quantity: 2 },
    { id: 2, name: 'Product 2', price: 30, quantity: 1 },
  ]);

  const handleCheckout = (formData) => {
    console.log('Order placed:', formData);
  };

  return <Checkout cartItems={cartItems} onCheckout={handleCheckout} />;
};

export default ParentComponent;
