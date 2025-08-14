import { Router } from 'express';
import { Op } from 'sequelize';
import Product from '../models/Product.js';

const Product_Router = Router();

const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 10;
const ALLOWED_SORT_FIELDS = ['id', 'name', 'price', 'created_at', 'stock'];

// GET /products
Product_Router.get('/', async (req, res) => {
  try {
    // ----- Pagination -----
    let page = parseInt(req.query.page, 10) || 1;
    let limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;

    if (page < 1) page = 1;
    if (limit < 1) limit = DEFAULT_LIMIT;
    if (limit > MAX_LIMIT) limit = MAX_LIMIT;

    const offset = (page - 1) * limit;

    // ----- Sorting -----
    const sortBy = ALLOWED_SORT_FIELDS.includes(req.query.sortBy)
      ? req.query.sortBy
      : 'id';
    const sortOrder = req.query.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // ----- Search -----
    const where = {};
    const search = req.query.search?.trim();
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }

    // ----- Query -----
    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    // ----- Response -----
    res.json({
      success: true,
      data: rows,
      meta: {
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        pageSize: limit,
        sortBy,
        sortOrder,
        search: search || null,
      },
    });
  } catch (error) {
    console.error(`[GET /products] ${error.message}`, { stack: error.stack });
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

// GET /products/:id
Product_Router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error(`[GET /products/:id] ${error.message}`, { stack: error.stack });
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

export default Product_Router;
