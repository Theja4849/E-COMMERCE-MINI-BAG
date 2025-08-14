import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productsSlice';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { HiSearch } from "react-icons/hi";

const Products = () => {

  const dispatch = useDispatch();
  const { items = [], status, error, meta } = useSelector((state) => state.products || {});
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const limit = 9;

  useEffect(() => {
    dispatch(fetchProducts({ page, limit }));
  }, [dispatch, page]);

  const totalPages = meta?.totalPages || 1;

  // Filter products by name & description (case-insensitive) as user types
  const filteredItems = input
    ? items.filter(product =>
        product.name.toLowerCase().includes(input.toLowerCase()) ||
        product.description.toLowerCase().includes(input.toLowerCase()) 
      )
    : items;

  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <div className="relative w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400 pointer-events-none">
            <HiSearch className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search products..."
            className="border border-violet-300 focus:border-violet-500 focus:ring-violet-200 focus:ring-2 transition rounded-full pl-10 py-2 shadow-sm w-full text-sm outline-none"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ minWidth: 0 }}
          />
         
        </div>
      </div>

      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((product) => (
          <div key={product.id} className="card flex flex-col items-center">
            <img src={product.imageUrl} alt={product.name} className="w-40 h-40 object-cover mb-2 rounded" />
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="font-bold text-violet-700 mb-2">${product.price}</div>
            <Link to={`/products/${product.id}`} className="btn btn-primary w-full text-center">View Details</Link>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            className={`px-3 py-1 rounded ${num === page ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setPage(num)}
            disabled={num === page}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
