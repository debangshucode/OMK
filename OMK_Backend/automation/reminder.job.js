const cron = require("node-cron");
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const sendEmail = require("../utils/sendEmail");

const sendReminders = async () => {
  const now = new Date();
  const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const start = new Date(nextDay.setHours(0, 0, 0, 0));
  const end = new Date(nextDay.setHours(23, 59, 59, 999));

  const bookings = await Booking.find({
    date: { $gte: start, $lte: end },
    status: { $in: ["pending", "confirmed"] },
  }).populate("user", "name email");

  for (const booking of bookings) {
    await sendEmail(
      booking.user.email,
      "Reminder: Upcoming Photo Session",
      `<p>Hi ${booking.user.name},</p>
       <p>This is a reminder for your <strong>${booking.serviceType}</strong> photoshoot on <strong>${booking.date.toDateString()}</strong> at <strong>${booking.timeSlot}</strong>.</p>`
    );
  }
};

// Schedule the job to run every day at 9 AM
cron.schedule("0 9 * * *", () => {
  console.log("Running booking reminder job...");
  sendReminders();
});
