import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './configs/db.js';
import userRoutes from './routes/user.route.js'
import taskRoutes from './routes/task.route.js'

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));