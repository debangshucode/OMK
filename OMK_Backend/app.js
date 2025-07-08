const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");
const userRoutes = require("./routes/auth.routes.js");
const bookingRoutes = require("./routes/booking.routes.js");
const reviewRoutes = require("./routes/review.routes.js");
const albumRoutes = require("./routes/album.routes.js");
const fileRoutes = require("./routes/file.routes.js");
const faceRoutes = require("./routes/face.routes.js");

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URLS],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/blogs", require("./routes/blog.routes"));
app.use("/api/albums", albumRoutes);
app.use("/api/files", fileRoutes);

// portfolio face matching
app.use("/api/match", faceRoutes);

module.exports = app;
