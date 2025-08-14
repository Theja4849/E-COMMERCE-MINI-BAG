import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();


export const sequelize = new Sequelize(
      process.env.DB_NAME || 'minibag',
      process.env.DB_USER || 'postgres',
      process.env.DB_PASS || 'postgres',
      {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
        dialect: 'postgres',
        logging: false,
      }
    );

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log(' DB connection established');

  } catch (err) {
    console.error(' Unable to connect to DB:', err);
    process.exit(1);
  }
}
