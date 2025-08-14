import { Router } from "express";
import Product_Router from "./products.js";
import CartRouter from "./cart.js";
import CheckoutRouter from "./checkout.js";
import OrdersRouter from "./orders.js";

const routes = Router();

routes.use('/products', Product_Router);
routes.use('/cart', CartRouter);
routes.use('/checkout', CheckoutRouter);
routes.use('/orders', OrdersRouter);

export default routes;
