
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../slices/ordersSlice';
import Breadcrumbs from '../components/Breadcrumbs';


const Orders = () => {
  const dispatch = useDispatch();
  const { items, status, error, meta } = useSelector((state) => state.orders);
  const [page, setPage] = useState(1);
  const limit = 2;

  useEffect(() => {
    dispatch(fetchOrders({ page, limit }));
  }, [dispatch, page]);

  const totalPages = meta?.totalPages || 1;

  return (
    <div className="container mx-auto p-4">
      <Breadcrumbs />
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div className="text-red-500">{error}</div>}
      {items.length === 0 && status === 'succeeded' && <div>No orders found.</div>}
      <div className="space-y-6">
        {items.map(order => (
          <div key={order.id} className="card p-4">
            <div className="font-bold text-lg mb-2">Order #{order.id.slice(0, 8).toUpperCase()}</div>
            <div className="mb-1">Name: {order.name}</div>
            <div className="mb-1">Email: {order.email}</div>
            <div className="mb-1">Address: {order.address}</div>
            <div className="mb-1">Total: <span className="font-semibold">${order.total}</span></div>
            <div className="mt-2">
              <div className="font-medium mb-1">Items:</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border mt-2">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 border">Image</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Price</th>
                      <th className="p-2 border">Quantity</th>
                      <th className="p-2 border">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.OrderItems?.map(item => (
                      <tr key={item.id}>
                        <td className="p-2 border">
                          {item.Product?.imageUrl && (
                            <img src={item.Product.imageUrl} alt={item.Product.name} className="w-16 h-16 object-cover rounded" />
                          )}
                        </td>
                        <td className="p-2 border">{item.Product?.name || 'Product'}</td>
                        <td className="p-2 border">${item.priceAtPurchase}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border font-semibold">${(item.priceAtPurchase * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default Orders;
