import { sequelize } from './models/db/db.js';
import Product from './models/Product.js';

const seedProducts = [
  {
    name: 'Classic Leather Tote',
    description: 'A timeless leather tote for everyday use.',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
    price: 89.99,
    stock: 50
  },
  {
    name: 'Canvas Weekend Bag',
    description: 'Durable canvas bag perfect for short trips.',
    imageUrl: 'https://images.unsplash.com/photo-1544441891-162155f1e9b5',
    price: 59.99,
    stock: 40
  },
  {
    name: 'Mini Crossbody Pouch',
    description: 'Compact crossbody for essentials.',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    price: 29.99,
    stock: 100
  },
  {
    name: 'Travel Duffel Pro',
    description: 'Spacious duffel with compartments.',
    imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601',
    price: 99.0,
    stock: 25
  },
  {
    name: 'City Backpack',
    description: 'Sleek backpack for work and play.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    price: 74.5,
    stock: 60
  }
];

async function run() {
  try {
    await sequelize.sync({ alter: true });
    const count = await Product.count();
    if (count === 0) {
      await Product.bulkCreate(seedProducts);
      console.log("Data seeded successfully");
    }else{
            console.log("Products table already has data, skipping seeding.");
        }
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

run();
