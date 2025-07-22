const express = require("express");
const { createBooking, getAllBookings, updateBookingStatus, deleteBooking } = require("../controllers/booking.controller.js");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, authorizeRoles("admin"), getAllBookings);
router.patch("/:id", protect, authorizeRoles("admin"), updateBookingStatus);
router.delete("/:id", protect, authorizeRoles("admin"),deleteBooking);

module.exports = router;
