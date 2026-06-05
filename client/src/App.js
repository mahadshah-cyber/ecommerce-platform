import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.get('/api/auth/me', {headers: {Authorization: 'Bearer '+token}})
        .then(r => setUser(r.data))
        .catch(() => { setToken(null); localStorage.removeItem('token'); });
    }
  }, [token]);

  const addToCart = (p) => {
    setCart(prev => {
      const e = prev.find(i => i._id === p._id);
      if (e) return prev.map(i => i._id === p._id ? {...i, quantity: i.quantity+1} : i);
      return [...prev, {...p, quantity: 1}];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i._id !== id));
  const updateQuantity = (id, q) => setCart(prev => prev.map(i => i._id === id ? {...i, quantity: q} : i));
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/" className="logo">ShopEase</Link>
        <div className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
          {user ? <span style={{color:'#60a5fa'}}>{user.name}</span> : <Link to="/login">Login</Link>}
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} total={total} user={user} />} />
          <Route path="/admin" element={<Admin token={token} />} />
        </Routes>
      </main>
    </div>
  );
}
export default App;
