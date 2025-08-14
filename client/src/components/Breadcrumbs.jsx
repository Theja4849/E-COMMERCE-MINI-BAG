import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const pathNames = {
  '': 'Home',
  products: 'Products',
  cart: 'Cart',
  checkout: 'Checkout',
  orders: 'Orders',
};

const Breadcrumbs = () => {
  const location = useLocation();
  const params = useParams();
  const path = location.pathname.split('/').filter(Boolean);


  // For product details page
  if (path[0] === 'products' && path[1]) {
    return (
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-reset flex text-gray-600">
          <li><Link to="/products" className="hover:underline">Products</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-violet-700 font-semibold">Product Details</li>
        </ol>
      </nav>
    );
  }

  // For cart, checkout, orders: root should be Products
  if (path[0] === 'cart' || path[0] === 'checkout' || path[0] === 'orders') {
    let crumbs = [];
    path.reduce((prev, curr, idx) => {
      const to = `/${[...path.slice(0, idx + 1)].join('/')}`;
      crumbs.push({
        name: pathNames[curr] || curr.charAt(0).toUpperCase() + curr.slice(1),
        to,
        isLast: idx === path.length - 1,
      });
      return to;
    }, '');
    return (
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-reset flex text-gray-600">
          <li><Link to="/products" className="hover:underline">Products</Link></li>
          {crumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.to}>
              <li><span className="mx-2">/</span></li>
              {crumb.isLast ? (
                <li className="text-violet-700 font-semibold">{crumb.name}</li>
              ) : (
                <li><Link to={crumb.to} className="hover:underline">{crumb.name}</Link></li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    );
  }

  let crumbs = [];
  path.reduce((prev, curr, idx) => {
    const to = `/${[...path.slice(0, idx + 1)].join('/')}`;
    crumbs.push({
      name: pathNames[curr] || curr.charAt(0).toUpperCase() + curr.slice(1),
      to,
      isLast: idx === path.length - 1,
    });
    return to;
  }, '');

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-reset flex text-gray-600">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        {crumbs.map((crumb, idx) => (
          <React.Fragment key={crumb.to}>
            <li><span className="mx-2">/</span></li>
            {crumb.isLast ? (
              <li className="text-violet-700 font-semibold">{crumb.name}</li>
            ) : (
              <li><Link to={crumb.to} className="hover:underline">{crumb.name}</Link></li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
