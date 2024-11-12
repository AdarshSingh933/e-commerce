import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item)=>(
        <CartItem product= {item} />
      ))}
    </div>
  );
};

export default Cart;
