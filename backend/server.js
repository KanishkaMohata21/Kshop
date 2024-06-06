import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'; 
import productRoutes from './routes/productRoutes.js'

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', 
}));

app.use('/api/user', authRoutes);
app.use('/api/products', productRoutes);

connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
