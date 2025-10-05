import CartItem from "../CartItem.js";
import Product from "../Product.js";
import Order from "../Order.js";
import { connectDB } from "./db.js";
import OrderItem from "../OrderItem.js";
async function init() {

    const isDev = false;    
    
   await Product.sync({ alter: isDev });
   await CartItem.sync({ alter: isDev });
   await Order.sync({ alter: isDev });
   await OrderItem.sync({ alter: isDev });
}
const dbInit = () => {
    init();
    connectDB();
};

export default dbInit;