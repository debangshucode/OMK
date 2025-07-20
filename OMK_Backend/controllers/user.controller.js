const User = require("../models/user.model");

exports.updateUserSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
      const { name, email, phone, partnerName } = req.body;
      const profileImage = req.file?.path;

    const updateFields = {};

    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (partnerName) updateFields.partnerName = partnerName;
    if (profileImage) updateFields.profileImage = profileImage;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User settings updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
