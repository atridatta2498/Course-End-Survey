const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://62.72.31.209:3001',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Use the router, not the controller

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});