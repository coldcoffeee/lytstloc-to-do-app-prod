const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (decodedToken.exp <= Date.now() / 1000) {
      return res.status(401).json({ message: "Token expired" });
    }

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
