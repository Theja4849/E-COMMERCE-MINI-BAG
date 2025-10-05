import { Link } from 'react-router-dom';
const Home = () => (
  <div className="container mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Welcome to Mini Bag Store</h2>
    <p className="mb-8">Discover our featured products and shop the latest bags!</p>
    <Link to="/products" className="btn btn-primary">Explore Products</Link>
  </div>
);
export default Home;
