require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");

// Import Routes
const authRoutes = require("./routes/auth");
const rideRoutes = require("./routes/rides");
const userRoutes = require("./routes/users");
const fareRoutes = require("./routes/fares");
const bookingRoutes = require("./routes/bookings");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/users", userRoutes);
app.use("/api/fares", fareRoutes);
app.use("/api/bookings", bookingRoutes);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Uber-like app API!" });
});

// Sync Database and Start Server
const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL database.");
    return sequelize.sync(); // Sync database (apply migrations and models)
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
