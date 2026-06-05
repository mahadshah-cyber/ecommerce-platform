import React from 'react';
import { Link } from 'react-router-dom';

export default function Cart({ cart, removeFromCart, updateQuantity, total, user }) {
  if (cart.length === 0) {
    return <div className="cart-empty"><h2>Your cart is empty</h2><Link to="/products" className="btn-primary">Continue Shopping</Link></div>;
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart ({cart.length} items)</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-controls">
              <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity-1))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity+1)}>+</button>
            </div>
            <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
            <button onClick={() => removeFromCart(item._id)} className="btn-remove">Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        {user ? <Link to="/checkout" className="btn-primary">Proceed to Checkout</Link> : <p>Please login to checkout</p>}
      </div>
    </div>
  );
}
