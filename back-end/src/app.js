const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const progressRoutes = require("./routes/progress");
const dietPlanRoutes = require("./routes/dietPlans");
const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/admin");
const testChainRoutes = require("./routes/testChain.routes");
const blockchainRoutes = require("./routes/blockchainRoutes");

const app = express();

// CORS untuk Vite + credentials
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));      // ini sudah handle preflight OPTIONS
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "NutriPath API is running" });
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/diet-plans", dietPlanRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", testChainRoutes);
app.use("/api/blockchain", blockchainRoutes);

// START SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
