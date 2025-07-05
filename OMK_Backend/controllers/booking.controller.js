const Booking = require("../models/booking.model");

exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, serviceType, date, message } =
      req.body;

    if (!name || !email || !phone || !service || !serviceType || !date) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    const newBooking = await Booking.create({
      name,
      email,
      phone,
      service,
      serviceType,
      date,
      message,
    });

    res.status(201).json({
      message: "Booking request submitted successfully",
      booking: newBooking,
    });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
