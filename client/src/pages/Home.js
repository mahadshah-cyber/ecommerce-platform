import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Welcome to ShopEase</h1>
        <p>Discover amazing products at unbeatable prices. Secure checkout powered by Stripe.</p>
        <Link to="/products" className="btn-primary">Shop Now</Link>
      </div>
    </div>
  );
}
