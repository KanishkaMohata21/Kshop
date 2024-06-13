import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './database.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'; 
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// Increase the maximum request body size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
    origin: 'http://localhost:3000', 
}));

// Your routes and other middleware setup...
app.use('/api/user', authRoutes);
app.use('/api/products', productRoutes);

connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send({ success: false, error: 'Invalid JSON payload' });
  } else {
    res.status(500).send({ success: false, error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
