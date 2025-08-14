import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db/db.js';

class Order extends Model {}

Order.init(
  {
    id: { type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
     },
    name: { type: DataTypes.STRING,
         allowNull: false
         },
    email: { type: DataTypes.STRING, 
        allowNull: false
     },
    address: { type: DataTypes.TEXT, 
        allowNull: false 
    },
    total: { type: DataTypes.DECIMAL(10, 2),
         allowNull: false 
        }
  },
  { sequelize, modelName: 'Order', tableName: 'orders', underscored: true }
);

export default Order;