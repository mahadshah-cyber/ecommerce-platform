import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin({ token }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({name:'', description:'', price:'', category:'Electronics', stock:''});

  useEffect(() => { axios.get('/api/products').then(r => setProducts(r.data.products)).catch(() => {}); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post('/api/products', form, {headers: {Authorization: 'Bearer '+token}});
      setProducts([r.data.product, ...products]);
      setForm({name:'', description:'', price:'', category:'Electronics', stock:''});
    } catch { alert('Error creating product'); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/api/products/'+id, {headers: {Authorization: 'Bearer '+token}});
      setProducts(products.filter(p => p._id !== id));
    } catch { alert('Error deleting'); }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="admin-grid">
        <div className="admin-form">
          <h2>Add Product</h2>
          <form onSubmit={handleSubmit}>
            <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description:e.target.value})} required />
            <input type="number" step="0.01" placeholder="Price" value={form.price} onChange={e => setForm({...form, price:e.target.value})} required />
            <select value={form.category} onChange={e => setForm({...form, category:e.target.value})}>
              <option>Electronics</option><option>Clothing</option><option>Books</option><option>Home</option><option>Sports</option>
            </select>
            <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock:e.target.value})} required />
            <button type="submit" className="btn-primary">Add Product</button>
          </form>
        </div>
        <div className="admin-list">
          <h2>Products ({products.length})</h2>
          {products.map(p => (
            <div key={p._id} className="admin-item">
              <div><strong>{p.name}</strong> - ${p.price} [{p.category}]</div>
              <button onClick={() => handleDelete(p._id)} className="btn-danger">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
