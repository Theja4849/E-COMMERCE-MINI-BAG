import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db/db.js';
import Product from './Product.js';

class CartItem extends Model {}

CartItem.init(
  {
    id: { type: DataTypes.UUID,
         primaryKey: true, 
         defaultValue: DataTypes.UUIDV4,
         },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'products', key: 'id' },
      field: 'product_id'
    },
    quantity: { 
        type: DataTypes.INTEGER,
         allowNull: false, 
         defaultValue: 1 }
  },
  { sequelize, modelName: 'CartItem', tableName: 'cart_items', underscored: true }
);

CartItem.belongsTo(Product, { foreignKey: 'productId' });

export default CartItem;
