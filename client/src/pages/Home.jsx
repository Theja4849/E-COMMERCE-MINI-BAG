

import { Link } from 'react-router-dom';
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const Home = () => (
  <div className="container mx-auto p-4">
    {/* <Breadcrumbs /> */}
    <h2 className="text-2xl font-bold mb-4">Welcome to Mini Bag Store</h2>
    <p className="mb-8">Discover our featured products and shop the latest bags!</p>
    <Link to="/products" className="btn btn-primary">Explore Products</Link>
  </div>
);

export default Home;
