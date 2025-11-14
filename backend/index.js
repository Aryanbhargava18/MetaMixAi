// MUST load .env first (BEFORE requiring routes)
console.log("Loading env...");
require("dotenv").config();
console.log("JWT_SECRET is:", process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Now require routes (they will get correct env values)
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Base route
app.get('/', (req, res) => {
  res.send('🚀 Backend API is running!');
});

// Use auth routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
