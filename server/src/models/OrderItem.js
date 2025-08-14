import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db/db.js';
import Order from './Order.js';
import Product from './Product.js';

class OrderItem extends Model {}

OrderItem.init(
  {
    id: { type: DataTypes.UUID, 
        primaryKey: true,
         defaultValue: DataTypes.UUIDV4
         },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'orders', key: 'id' },
      field: 'order_id'
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'products', key: 'id' },
      field: 'product_id'
    },
    quantity: { type: DataTypes.INTEGER,
         allowNull: false,
          defaultValue: 1 
        },
    priceAtPurchase: { type: DataTypes.DECIMAL(10, 2),
         allowNull: false,
          field: 'price_at_purchase' }
  },
  { sequelize, modelName: 'OrderItem', tableName: 'order_items', underscored: true }
);

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

export default OrderItem;