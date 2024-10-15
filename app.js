require('dotenv').config();
const express = require('express');

const connectDB = require('./configs/db');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));