import { Router } from 'express';
import { Op } from 'sequelize';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const CartRouter = Router();

// Constants
const MAX_QUANTITY = 10;

// GET /cart – Fetch all cart items with product details
CartRouter.get('/', async (req, res) => {
  try {
    const items = await CartItem.findAll({
      include: [{ model: Product }],
      order: [['id', 'ASC']],
    });

    res.json({
      success: true,
      data: items,
      meta: { totalItems: items.length },
    });
  } catch (error) {
    console.error(`[GET /cart] ${error.message}`, { stack: error.stack });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// POST /cart – Add or update a product in the cart
// Body: { productId: number, quantity?: number }
CartRouter.post('/', async (req, res) => {
  try {
 const productId = req.body?.productId;
    let quantity = Number(req.body?.quantity) || 1;

    if (!productId || productId <= 0) {
      return res.status(400).json({ success: false, error: 'Valid productId is required' });
    }

    quantity = Math.max(1, Math.min(quantity, MAX_QUANTITY));

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({ where: { productId } });
    let item;
    if (existingItem) {
      // Update quantity instead of creating duplicate
      existingItem.quantity = Math.min(existingItem.quantity + quantity, MAX_QUANTITY);
      await existingItem.save();
      item = existingItem;
    } else {
      item = await CartItem.create({ productId, quantity });
    }

    // Return item with product details
    const itemWithProduct = await CartItem.findByPk(item.id, { include: Product });

    res.status(201).json({ success: true, data: itemWithProduct });
  } catch (error) {
    console.error(`[POST /cart] ${error.message}`, { stack: error.stack });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// DELETE /cart/:id – Remove a product from the cart using cart item id
CartRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, error: 'Valid cart item id is required' });
    }

    const item = await CartItem.findByPk(id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    await item.destroy();
    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error(`[DELETE /cart/:id] ${error.message}`, { stack: error.stack });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default CartRouter;
