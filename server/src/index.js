// Entry point for the server (ESM)
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbInit from './models/db/init.js';
import routes from './routes/index.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())


app.use('/api/v1', routes);
app.get('/', (req, res) => {
  res.send('Welcome to mini-bag website');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

dbInit();

