import { Router } from 'express';
import { sequelize } from '../models/db/db.js';
import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import Product from '../models/Product.js';

const router = Router();

// checkout – Save order details
// Body: { name, email, address, items: [{ productId, quantity }] }
router.post('/', async (req, res) => {
  const { name, email, address, items } = req.body || {};

  //validate inputs 
  if (!name || !email || !address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'name, email, address, and items are required' });
  }

  try {
    const result = await sequelize.transaction(async (t) => {

      // Calculate total based on current prices
      let total = 0;
      const lineItems = [];

      for (const i of items) {
        if (!i.productId || typeof i.productId !== 'string') {
          throw new Error(`Invalid product: ${i.productId}`);
        }

        const product = await Product.findByPk(i.productId, { transaction: t, lock: t.LOCK.UPDATE });

        if (!product) throw new Error(`Invalid product: ${i.productId}`);
        const qty = Math.max(1, Number(i.quantity) || 1);

        //checks if there is enough stock in the database
        if (product.stock < qty) {
          throw new Error(`Not enough stock for product: ${product.name}`);
        }
        const price = Number(product.price);
        total += qty * price;

       // Stores each product’s details
        lineItems.push({ productId: product.id, quantity: qty, priceAtPurchase: price });
        // Update stock
        product.stock -= qty;
        await product.save({ transaction: t });
      }

      //creates new record in order table
      const order = await Order.create({ name, email, address, total }, { transaction: t });
      //creates new records in order items table
      for (const li of lineItems) {
        await OrderItem.create({ orderId: order.id, ...li }, { transaction: t });
      }

      return order;
    });

    res.status(201).json({ message: 'Order placed successfully', orderId: result.id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || 'Checkout failed' });
  }
});

export default router;
