const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true }, // e.g., "10:00 AM - 11:00 AM"
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
