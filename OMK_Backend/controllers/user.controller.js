const User = require("../models/user.model");


exports.updateUserSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      name,
      email,
      phone,
      partnerName,
      address
    } = req.body;

    const updateFields = {};

    if (name) updateFields.name = name.trim();
    if (email) updateFields.email = email.trim().toLowerCase();
    if (phone) updateFields.phone = phone.trim();
    if (partnerName) updateFields.partnerName = partnerName.trim();
    if (address) updateFields.address = address.trim();
    if (req.file?.path) updateFields.profileImage = req.file.path;

    // Prevent updating if no fields are provided
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "No update fields provided" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      {
        new: true,
        runValidators: true,
        select: "name email phone partnerName profileImage address"
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User settings updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Error updating user settings:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


exports.getUserSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "name email phone partnerName profileImage address"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
