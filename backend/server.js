const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for React frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const preferenceRoutes = require('./routes/preferenceRoutes');
const listingRoutes = require('./routes/listingRoutes');
const savedRoutes = require('./routes/savedRoutes');
const gemmaRoutes = require('./routes/gemmaRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/preferences', preferenceRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/saved', savedRoutes);
app.use('/api/gemma', gemmaRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: "Belong API is working"
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});