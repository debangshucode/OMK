const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");

router.post("/request", bookingController.createBooking);

module.exports = router;
