// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// 🔹 Import routes
const authRoutes = require('./routes/auth');
const bloodRoutes = require('./routes/blood');
const doctorRoutes = require('./routes/doctor');
const adminRoutes = require('./routes/admin');
const appointmentRoutes = require('./routes/appointment');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
});
app.use('/api/', apiLimiter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(' MongoDB connected successfully'))
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });

// Default Route
app.get('/', (req, res) => {
  res.send('🏥 Hospital Management System Backend Running...');
});

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/blood', bloodRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointments', appointmentRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: err.message || 'Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
