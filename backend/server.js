const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const jobRoutes = require('./routes/jobRoutes');

const app = express();

// ✅ Middleware
app.use(cors()); // simple and safe for now
app.use(express.json());

// ✅ Routes
app.use('/api/jobs', jobRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.json({ message: 'API running successfully 🚀' });
});

// ✅ PORT FIX (IMPORTANT)
const PORT = process.env.PORT || 5001;

// ✅ MongoDB connection + server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error);
  });