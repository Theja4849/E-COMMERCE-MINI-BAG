import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db/db.js";

class Product extends Model {}

Product.init(
  {
    id: { type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4,
     },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    imageUrl: { type: DataTypes.STRING, 
        allowNull: false 
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    stock: { type: DataTypes.INTEGER, 
        allowNull: false, defaultValue: 0 
    },
  },
  { sequelize, modelName: "Product", tableName: "products", underscored: true }
);

export default Product;
