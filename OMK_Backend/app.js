const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db.js");
const userRoutes = require("./routes/auth.routes.js");
const bookingRoutes = require("./routes/booking.routes.js");
const reviewRoutes = require("./routes/review.routes.js");
const albumRoutes = require("./routes/album.routes.js");
const fileRoutes = require("./routes/file.routes.js");
const faceRoutes = require("./routes/face.routes.js");
const settingRoutes = require("./routes/user.routes.js");
const recentRoutes = require("./routes/recentwork.routes.js");

const app = express();

// Make the 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

dotenv.config();
connectDB();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/settings", settingRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/blogs", require("./routes/blog.routes"));
app.use("/api/albums", albumRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/recentwork", recentRoutes);

// portfolio face matching
app.use("/api/match", faceRoutes);

module.exports = app;
