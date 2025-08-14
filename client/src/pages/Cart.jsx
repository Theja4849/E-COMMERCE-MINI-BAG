

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, updateQuantity, removeFromCart, clearCart } from '../slices/cartSlice';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items || []);
  const products = useSelector((state) => state.products.items || []);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const getProduct = (productId) => {
    // item.Product is included from backend, fallback to products slice if needed
    return (
      cartItems.find(i => i.productId === productId)?.Product ||
      products.find(p => p.id === productId) ||
      {}
    );
  };

  const handleQuantityChange = (item, value, stock) => {
    const qty = Math.max(1, Math.min(stock, Number(value)));
    dispatch(updateQuantity({ id: item.id, quantity: qty }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Product removed successfully!');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared successfully!');
  };

  const total = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product.price ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs />
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="mb-4">Your cart is empty. <Link to="/products" className="text-violet-700 underline">Go to Products</Link></div>
      ) : (
        <>
          <button className="btn btn-outline mb-4" onClick={handleClearCart}>Clear Cart</button>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => {
              const product = getProduct(item.productId);
              return (
                <div key={item.id} className="card flex flex-col sm:flex-row items-center gap-4">
                  <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="text-gray-600">${product.price} x </div>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item, e.target.value, product.stock)}
                      className="border rounded px-2 py-1 w-16 ml-2"
                    />
                    <span className="ml-2">= {(product.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button className="btn btn-outline" onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-xl font-bold">Total: ${total.toFixed(2)}</div>
          <Link to="/checkout" className="btn btn-primary mt-4 inline-block">Proceed to Checkout</Link>
        </>
      )}
    </div>
  );
};

export default Cart;
