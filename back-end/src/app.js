const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const progressRoutes = require('./routes/progress');
const dietPlanRoutes = require('./routes/dietPlans');

const app = express();
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
    res.json({ message: "NutriPath API is running 🚀" });
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/diet-plans', dietPlanRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const paymentRoutes = require('./routes/payment');
app.use('/api/payments', paymentRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
