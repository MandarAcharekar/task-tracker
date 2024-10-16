import express from 'express';
import dotenv from 'dotenv';

import connectDB from './configs/db.js';
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));