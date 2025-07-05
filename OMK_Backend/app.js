const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/auth.routes.js");
const bookingRoutes = require("./routes/booking.routes");
dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
