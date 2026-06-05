import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CATS = ['All','Electronics','Clothing','Books','Home','Sports'];

export default function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [cat, setCat] = useState('All');

  useEffect(() => {
    axios.get('/api/products', {params: {category: cat}})
      .then(r => setProducts(r.data.products))
      .catch(() => setProducts([]));
  }, [cat]);

  return (
    <div className="products-page">
      <h1>Products</h1>
      <div className="products-controls">
        {CATS.map(c => (
          <button key={c} className={'cat-btn ' + (cat === c ? 'active' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="products-grid">
        {products.map(p => (
          <div key={p._id} className="product-card">
            {p.image && <img src={p.image} alt={p.name} className="product-image" />}
            <div className="product-info">
              <h3>{p.name}</h3>
              <span className="product-category">{p.category}</span>
              <p className="product-desc">{p.description.substring(0, 100)}...</p>
              <div className="product-footer">
                <span className="product-price">${p.price.toFixed(2)}</span>
                <button onClick={() => addToCart(p)} className="btn-add">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && <p className="no-products">No products found.</p>}
    </div>
  );
}
