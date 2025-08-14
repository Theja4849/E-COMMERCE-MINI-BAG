
# Mini Bag Store Frontend (React + Redux + Vite)

This is the frontend for the Mini Bag Store e-commerce project, built with React, Redux Toolkit, and Vite. It provides a modern, user-friendly shopping experience and demonstrates best practices for scalable frontend architecture.

## Features

- **Product Listing**: Paginated product grid with details and images.
- **Product Details**: View detailed info and add to cart with toast notifications.
- **Cart**: View, update, and remove items; dynamic cart icon with item count in navbar.
- **Checkout**: Simple checkout form, order submission, and cart clearing.
- **Orders**: Paginated order history with detailed item breakdown.
- **Navigation**: Navbar, breadcrumbs, and deep linking for all pages.
- **State Management**: Redux Toolkit for products, cart, and orders.
- **API Integration**: Communicates with a Node/Express backend via REST API (proxy setup in Vite).
- **Styling**: Tailwind CSS for responsive, modern UI.
- **UX Enhancements**: Toasts, breadcrumbs, numbered pagination, and more.

## Folder Structure

```
client/
	src/
		components/      # Reusable UI components (Navbar, Breadcrumbs, etc.)
		pages/           # Main pages (Products, ProductDetails, Cart, Checkout, Orders, Home)
		slices/          # Redux slices for state management
		assets/          # Static assets (images, icons)
		App.jsx          # Main app component with routing
		main.jsx         # Entry point
	public/            # Static files
	package.json       # Project dependencies and scripts
	vite.config.js     # Vite config (with API proxy)
	tailwind.config.js # Tailwind CSS config
```

## Key Implementation Details

- **Redux Toolkit**: Used for all global state (products, cart, orders). Async thunks handle API calls.
- **Pagination**: Both Products and Orders pages have numbered pagination controls, always showing at least one page.
- **Cart Icon**: Uses `react-icons` for a professional cart icon with a live item count badge.
- **Breadcrumbs**: Dynamic breadcrumbs reflect navigation path for better UX.
- **API Proxy**: Vite proxy forwards `/api/v1/*` requests to the backend server, enabling seamless local development.
- **Toasts**: `react-hot-toast` provides user feedback for cart actions and order submission.
- **Modern UI**: Tailwind CSS ensures a clean, responsive design.

## How to Run

1. Install dependencies:
	 ```sh
	 npm install
	 ```
2. Start the development server:
	 ```sh
	 npm run dev
	 ```
3. The app will be available at `http://localhost:5173` (default Vite port).




