

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { clearCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items || []);
  const products = useSelector((state) => state.products.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      toast.error('Please fill in all fields');
      return;
    }
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    setLoading(true);
    try {
      const items = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));
      await axios.post('/api/v1/checkout', {
        ...form,
        items
      });
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      setTimeout(() => navigate('/orders'), 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product?.price ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <Breadcrumbs />
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} className="border rounded px-3 py-2 w-full" required />
        </div>
        <div className="font-bold text-lg">Total: ${total.toFixed(2)}</div>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Placing Order...' : 'Place Order'}</button>
      </form>
    </div>
  );
};

export default Checkout;
