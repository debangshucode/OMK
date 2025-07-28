const User = require("../models/user.model.js");
const generateToken = require("../utils/generateToken.js");
const { OAuth2Client } = require("google-auth-library");

const {sendEmail } = require("../utils/sendEmail.js");
const crypto = require("crypto");
const { sendToken } = require("../utils/sendToken.js");
const { cookie } = require("express-validator");
const { generateEmailTemplate, resetPasswordTemplate } = require("../email/email.template.js");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
   if (!name || !email || !password ) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }
  try {
    const exists = await User.findOne({ email,accountVerified: true });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const registerationAttemptsByUser = await User.find({email, accountVerified: false });

    if (registerationAttemptsByUser.length > 3) {
      return res.status(403).json({ message: "You have exceeded the maximum number of attempts (3). Please try again after an hour." });
    }

    const user = await User.create({ name, email, password });
    const verificationCode = await user.generateVerificationCodeR();
    await user.save();
    
    // Send verification email
    await sendVerificationCode(
      verificationCode,
      name,
      email,
      // phone,
      res
    );
    
  } catch (err) {
    res.status(500).json({ message: "Registration error", error: err.message });
  }
};

async function sendVerificationCode(
  verificationCode,
  name,
  email,
  // phone,
  res
) {
  const message = generateEmailTemplate(verificationCode);
  try {
    await sendEmail({ email, subject: "Your Verification Code", message });
      res.status(200).json({
        success: true,
        message: `Verification email successfully sent to ${name}`,
      });
  } catch (error) {
    console.error("Email send failed:", error); 
    return res.status(500).json({
      success: false,
      message: "Verification code failed to send.",
    });
  }
      
}



exports.verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Please provide email and OTP" });
  }
  try {
    const userAllEntries = await User.find(
      {
          email,
          accountVerified: false,
        }
    ).sort({ createdAt: -1 });
    if (userAllEntries.length === 0) {
      return res.status(404).json({ message: "No unverified user found with this email" });
    }
    let user ;
    if (userAllEntries.length > 1) {
      user = userAllEntries[0];
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });

    }else {
      user = userAllEntries[0];
    }
    if (user.verificationCode !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const currentTime = Date.now();
    const verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();
    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler("OTP Expired.", 400));
    }
    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    await user.save({ validateModifiedOnly: true });
    
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production
      // secure: process.env.NODE_ENV === "production", // Use this in production
      sameSite: "Strict",
      expires: new Date(Date.now() + 360000000)    });

    return res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
    message: "User registered successfully and account verified.",
  });
    
    
    
  } catch (err) {
    return res.status(500).json({ message: "Error fetching user data", error: err.message });
  }

}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, accountVerified: true }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // await sendToken(user, 200, "Account Verified.", res);
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production
      // secure: process.env.NODE_ENV === "production", // Use this in production
      sameSite: "Strict",
      expires: new Date(Date.now() + 360000000)    });

    return res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
    message: "Login successful",
  });
//   res.cookie("testCookie", "testValue", {
//   httpOnly: true,
//   sameSite: "Strict",
//   secure: false, // force this for localhost
//   expires: new Date(Date.now() + 3600000)
// });
// res.status(200).json({ message: "Cookie test" });


  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};


// exports.logout = async (req, res) => {
//   try {
//     return res.status(200).json({
//     message: "Logged out successfully.",
//   });
//   } catch (error) {
//     console.error("Logout Error:", error);
//     return res.status(500).json({ message: "Logout failed", error: error.message });
    
//   }

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false, 
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
  // res
  //   .status(200)
  //   .cookie("token", "", {
  //     expires: new Date(Date.now()),
  //     httpOnly: true,
  //   })
  //   .json({
  //     success: true,
  //     message: "Logged out successfully.",
  //   });
  
// };

// Admin creating user 

exports.createUser = async (req, res) =>{
  try {
    const {name,email,password} = req.body
    if(!name || !email || !password){
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  const exists = await User.findOne({ email,accountVerified: true });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const registerationAttemptsByUser = await User.find({email, accountVerified: false });
    
    if (registerationAttemptsByUser.length > 3) {
      return res.status(403).json({ message: "You have exceeded the maximum number of attempts (3). Please try again after an hour." });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    const verificationCode = await user.generateVerificationCodeR();
    await user.save();

    await sendVerificationCode(
      verificationCode,
      name,
      email,
      // phone,
      res
    );


    return res.status(201).json({
      success: true,
      message: 'User created Successfully !',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error creating user by admin:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }

  
}

exports.accountVerification = async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Please provide email and OTP" });
  }
  try {
    const userAllEntries = await User.find(
      {
          email,
          accountVerified: false,
        }
    ).sort({ createdAt: -1 });
    if (userAllEntries.length === 0) {
      return res.status(404).json({ message: "No unverified user found with this email" });
    }
    let user ;
    if (userAllEntries.length > 1) {
      user = userAllEntries[0];
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });

    }else {
      user = userAllEntries[0];
    }
    if (user.verificationCode !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const currentTime = Date.now();
    const verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();
    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler("OTP Expired.", 400));
    }
    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    await user.save({ validateModifiedOnly: true });
  
    res.status(200).json({
 
    success:true,
    message: "Account verified Successfully.",
  });

    } catch (err) {
    return res.status(500).json({ message: "Error fetching user data", error: err.message });
  }

}


exports.getUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({role:"user"}).select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};


exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }
  const resetToken = user.generateResetPasswordTokeN();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message= resetPasswordTemplate(resetPasswordUrl)
  try {
    sendEmail({
      email:user.email,
      subject: "Password Reset Request",
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} with password reset instructions.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    console.error("Email send failed:", error);
    return res.status(500).json({
      success: false,
      message: "Email could not be sent. Please try again later.",
    });
    
  }
}

exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).json({
      message: "Reset password token is invalid or has expired.", 
    });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Password & confirm password do not match." });
  }
  try {
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
      token: generateToken(user),
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ message: "Error resetting password", error: error.message });
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: email + process.env.JWT_SECRET, // placeholder
      });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });

  } catch (err) {
    console.error("Google Login Error", err);
    res.status(401).json({ message: "Invalid Google Token" });
  }
};