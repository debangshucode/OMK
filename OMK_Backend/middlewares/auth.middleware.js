const jwt = require("jsonwebtoken");

// exports.protect = (req, res, next) => {
//   let token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // ✅ Attach user info (id, role, name) here
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

exports.protect = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
