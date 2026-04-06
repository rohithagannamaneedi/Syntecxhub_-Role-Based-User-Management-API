const User = require("../models/User");

exports.checkBlocked = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (user.isBlocked) {
    return res.status(403).json({ msg: "You are blocked" });
  }

  next();
};