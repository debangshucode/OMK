const express = require("express");
const { createBooking, getAllBookings, updateBookingStatus } = require("../controllers/booking.controller.js");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, authorizeRoles("admin"), getAllBookings);
router.patch("/:id", protect, authorizeRoles("admin"), updateBookingStatus);

module.exports = router;
