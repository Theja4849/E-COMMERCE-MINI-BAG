import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FiShoppingCart } from 'react-icons/fi';

const Navbar = () => {
  const cartCount = useSelector(state => state.cart?.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0);
  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-violet-700">Mini Bag Store</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/cart" className="relative flex items-center group">
            <FiShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] text-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/orders" className="hover:underline">Orders</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
