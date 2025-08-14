
# E-Commerce Server (Node.js, Express, PostgreSQL, Sequelize)

This project is a robust backend API for an e-commerce platform, built with Node.js, Express, PostgreSQL, and Sequelize ORM. It supports product browsing, cart management, order placement, and inventory control.

## Features
- Modern ES module structure (`type: module`)
- RESTful API for products, cart, and orders
- Pagination, sorting, and search for product and order listings
- Stock management (prevents overselling)
- Transactional order placement
- UUIDs for all primary keys
- Sequelize models and migrations
- Environment-based configuration

## Folder Structure

```
server/
├─ src/
│  ├─ models/         # Sequelize models (Product, CartItem, Order, OrderItem)
│  ├─ routes/         # Express route handlers (products, cart,   checkout, orders)
│  ├─ db/             # Database connection and init logic
│  ├─ seed.js         # Database seeding script
│  └─ index.js        # Main server entry point
├─ .env.example       # Example environment variables
├─ package.json       # Project metadata and scripts
├─ .gitignore         # Files/folders to ignore in git
└─ README.md          # This file
```

## Setup & Installation

1. **Clone the repository**
2. Copy `.env.example` to `.env` and fill in your DB credentials
3. Run `npm install` to install dependencies
4. (Optional) Run `npm run seed` to seed the database with sample products
5. Start the server: `npm start` (or `npm run dev` for hot reload)

## Environment Variables
See `.env.example` for all required variables:
- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_PORT`, `PORT`

## Scripts
- `npm start` — Start the server
- `npm run dev` — Start with nodemon for development
- `npm run seed` — Seed the database with sample data

## API Endpoints

### Products
- `GET /api/v1/products` — List products (supports pagination, sorting, search)
- `GET /api/v1/products/:id` — Get product details

### Cart
- `GET /api/v1/cart` — List cart items
- `POST /api/v1/cart` — Add/update product in cart (`{ productId, quantity }`)
- `DELETE /api/v1/cart/:id` — Remove item from cart

### Checkout
- `POST /api/v1/checkout` — Place an order
	- Body: `{ name, email, address, items: [{ productId, quantity }] }`
	- Checks stock, updates inventory, creates order and order items

### Orders
- `GET /api/v1/orders` — List all orders (paginated, with items and products)
- `GET /api/v1/orders/:id` — Get order details (with items and products)

## Database Models
- **Product**: id (UUID), name, description, imageUrl, price, stock
- **CartItem**: id (UUID), productId (UUID), quantity
- **Order**: id (UUID), name, email, address, total
- **OrderItem**: id (UUID), orderId (UUID), productId (UUID), quantity, priceAtPurchase

## Notes
- All IDs are UUIDs (universally unique identifiers)
- Stock is only reduced when an order is placed (not when adding to cart)
- All endpoints return JSON responses
- Error handling and validation are implemented for all routes

## Example Requests

**Add to Cart:**
```json
POST /api/v1/cart
{
	"productId": "<uuid>",
	"quantity": 2
}
```

**Checkout:**
```json
POST /api/v1/checkout
{
	"name": "Alice",
	"email": "alice@example.com",
	"address": "123 Main St",
	"items": [
		{ "productId": "<uuid>", "quantity": 1 },
		{ "productId": "<uuid>", "quantity": 2 }
	]
}

