const Booking = require("../models/booking.model.js");
const User = require("../models/user.model.js");
const { sendEmail } = require("../utils/sendEmail.js");

exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, serviceType, date,timeSlot, message } =
      req.body;

    const user = await User.findById(req.user.id);

    if (!name || !email || !phone  || !serviceType || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    try {
      // Optional: Check for conflicting booking
      const conflict = await Booking.findOne({ date, timeSlot, status: { $ne: "cancelled" } });
      if (conflict) {
        return res.status(400).json({ message: "Slot already booked" });
      }

      const newBooking = await Booking.create({
        user: user._id,
        name,
        email,
        phone,
        serviceType,
        date,
        timeSlot,
        message,
    });
    console.log("user email", user.email);

    // Send confirmation email
    await sendEmail({
      email: user.email,
      subject:"Booking Confirmation – OurMoments",

      message:`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; border: 1px solid #e1e5e9; border-radius: 8px; overflow: hidden;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
    <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">OurMoments</h1>
    <p style="margin: 0; font-size: 16px; opacity: 0.9; font-weight: 300;">Kolkata • Photography Services</p>
  </div>
  
  <!-- Main Content -->
  <div style="padding: 40px 30px;">
    
    <!-- Greeting -->
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 600; color: #2c3e50;">🎉 Booking Confirmed!</h2>
      <p style="margin: 0; font-size: 16px; color: #5a6c7d;">Thank you for choosing OurMoments Kolkata</p>
    </div>
    
    <!-- Personal Greeting -->
    <p style="margin: 0 0 30px 0; font-size: 18px; color: #2c3e50; font-weight: 500;">
      Hi ${user.name},
    </p>
    
    <!-- Booking Details Card -->
    <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); border-radius: 12px; padding: 30px; margin: 30px 0; color: white; text-align: center;">
      <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Your Session Details</h3>
      
      <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 20px; margin: 20px 0;">
        <p style="margin: 0 0 15px 0; font-size: 16px; opacity: 0.9;">Service Type</p>
        <p style="margin: 0; font-size: 22px; font-weight: 700; text-transform: capitalize;">${serviceType}</p>
      </div>
      
      <div style="display: flex; gap: 15px; margin: 20px 0;">
        <div style="flex: 1; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 15px;">
          <p style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">📅 Date</p>
          <p style="margin: 0; font-size: 16px; font-weight: 600;">${date}</p>
        </div>
        <div style="flex: 1; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 15px;">
          <p style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">⏰ Time</p>
          <p style="margin: 0; font-size: 16px; font-weight: 600;">${timeSlot}</p>
        </div>
      </div>
    </div>
  
    
    <!-- Contact Information -->
    <div style="background: #e8f5e9; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
      <h4 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2e7d32;">📞 Questions or Changes?</h4>
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #2e7d32;">
        Call us: <a href="tel:+919876543210" style="color: #2e7d32; text-decoration: none; font-weight: 600;">+91 98765 43210</a>
      </p>
      <p style="margin: 0; font-size: 14px; color: #2e7d32;">
        Email: <a href="mailto:bookings@ourmoments-kolkata.com" style="color: #2e7d32; text-decoration: none; font-weight: 600;">bookings@ourmoments-kolkata.com</a>
      </p>
    </div>
    
    <!-- Closing Message -->
    <div style="text-align: center; margin: 30px 0;">
      <p style="margin: 0 0 10px 0; font-size: 18px; color: #2c3e50; font-weight: 600;">We can't wait to capture your special moments! 📸</p>
      <p style="margin: 0; font-size: 16px; color: #5a6c7d;">See you soon at OurMoments Kolkata!</p>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="background: #2c3e50; padding: 30px; text-align: center; color: white;">
    <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #4ecdc4;">OurMoments Kolkata</p>
    <p style="margin: 0 0 4px 0; font-size: 14px; color: #bdc3c7;">Capturing your precious moments</p>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #bdc3c7;">📍 Kolkata, West Bengal</p>
    <div style="border-top: 1px solid #34495e; padding-top: 20px;">
      <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
        Follow us: 
        <a href="#" style="color: #4ecdc4; text-decoration: none; margin: 0 5px;">Instagram</a> | 
        <a href="#" style="color: #4ecdc4; text-decoration: none; margin: 0 5px;">Facebook</a> | 
        <a href="#" style="color: #4ecdc4; text-decoration: none; margin: 0 5px;">Website</a>
      </p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #7f8c8d;">
        © 2025 OurMoments Kolkata. All rights reserved.
      </p>
    </div>
  </div>
  
</div>`
    });
    
    // Send notification email to admin
    await sendEmail({
      email:process.env.SMTP_MAIL,
      subject:"New Booking Request – OurMoments",
      message :`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; border: 1px solid #e1e5e9; border-radius: 8px; overflow: hidden;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
    <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700;">OurMoments Kolkata</h1>
    <p style="margin: 0; font-size: 14px; opacity: 0.9;">Admin Notification</p>
  </div>
  
  <!-- Main Content -->
  <div style="padding: 30px;">
    
    <!-- Alert Header -->
    <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; padding: 15px; margin-bottom: 25px; text-align: center;">
      <h2 style="margin: 0; font-size: 18px; font-weight: 600; color: #155724;">🔔 New Booking Request</h2>
    </div>
    
    <!-- Customer Details -->
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2c3e50; border-bottom: 2px solid #4ecdc4; padding-bottom: 5px;">Customer Information</h3>
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #2c3e50;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #2c3e50;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #4ecdc4; text-decoration: none;">${email}</a></p>
      <p style="margin: 0; font-size: 14px; color: #2c3e50;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #4ecdc4; text-decoration: none;">${phone}</a></p>
    </div>
    
    <!-- Booking Details -->
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2c3e50; border-bottom: 2px solid #4ecdc4; padding-bottom: 5px;">Booking Details</h3>
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #2c3e50;"><strong>Service Type:</strong> ${serviceType}</p>
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #2c3e50;"><strong>Date:</strong> ${date}</p>
      <p style="margin: 0; font-size: 14px; color: #2c3e50;"><strong>Time Slot:</strong> ${timeSlot}</p>
    </div>
    
    <!-- Message -->
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
      <h3 style="margin: 0 0 15px 0; font-size: 16px; font-weight: 600; color: #2c3e50; border-bottom: 2px solid #4ecdc4; padding-bottom: 5px;">Customer Message</h3>
      <p style="margin: 0; font-size: 14px; color: #2c3e50; line-height: 1.5; font-style: italic;">${message || "No message provided"}</p>
    </div>
      
    
  </div>
  
  <!-- Footer -->
  <div style="background: #2c3e50; padding: 20px; text-align: center; color: white;">
    <p style="margin: 0; font-size: 12px; color: #bdc3c7;">
      OurMoments Kolkata Admin Panel<br>
      This is an automated notification. Time: ${new Date().toLocaleString()}
    </p>
  </div>
  
</div>`
    });
    
    res.status(201).json({
      message: "Booking request submitted successfully",
      booking: newBooking,
    });
    // res.status(201).json(booking);
    }catch (error) {
      console.error("Booking creation error:", error);
      res.status(500).json({ message: "Booking failed", error: error.message });
    }

  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



// Admin: Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").sort({ date: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// Admin: Update booking status
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updated = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    res.json(updated);
    
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status" });
  }
};

// Admin: Delete booking
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
};