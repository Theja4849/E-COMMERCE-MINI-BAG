

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/v1/products/${id}`)
      .then(res => {
        setProduct(res.data.data);
        setError(null);
      })
      .catch(err => {
        setError('Product not found');
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);


  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ productId: product.id, quantity }));
      toast.success('Product added successfully!');
      setTimeout(() => navigate('/cart'), 500);
    }
  };

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
   
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img src={product.imageUrl} alt={product.name} className="w-64 h-64 object-cover rounded" />
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="mb-2 text-gray-700">{product.description}</p>
          <div className="font-bold text-violet-700 mb-2 text-lg">${product.price}</div>
          <div className="mb-4">Stock: {product.stock}</div>
          <div className="flex items-center gap-2 mb-4">
            <label htmlFor="quantity" className="font-medium">Qty:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
              className="border rounded px-2 py-1 w-16"
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
