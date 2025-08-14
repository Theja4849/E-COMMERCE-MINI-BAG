
## Project Structure

```
E-COMMERCE/
  client/   # Frontend (React, Redux, Vite, Tailwind CSS)
  server/   # Backend (Node.js, Express, Sequelize, PostgreSQL)
```

---

## Frontend (client/)
- Built with **React 18**, **Redux Toolkit**, **Vite**, and **Tailwind CSS**
- Features:
  - Product listing with pagination
  - Product details and add-to-cart with toast notifications
  - Cart management (add, update, remove, clear)
  - Checkout form and order submission
  - Order history with pagination and detailed breakdown
  - Navbar with dynamic cart icon and item count
  - Breadcrumb navigation for all pages
  - API integration via Vite proxy
- See [`client/README.md`](client/README.md) for full details and setup instructions.

---

## Backend (server/)
- Built with **Node.js**, **Express**, **Sequelize ORM**, and **PostgreSQL**
- Features:
  - RESTful API for products, cart, orders, and checkout
  - Pagination, sorting, and search for products and orders
  - Database models for products, orders, order items, and cart items
  - Seed scripts for demo data
- See [`server/README.md`](server/README.md) for full details and setup instructions.

---

## How to Run the Project

1. **Clone the repository:**

   git clone <repo-url>
   cd E-COMMERCE
   
2. **Start the backend:**
   
   cd server
   npm install
   npm run dev
   npm run seed
   
3. **Start the frontend:**
   
   cd ../client
   npm install
   npm run dev

4. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000/api/v1](http://localhost:3000/api/v1)

---

## Key Technologies
- React, Redux Toolkit, Vite, Tailwind CSS
- Node.js, Express, Sequelize, PostgreSQL

