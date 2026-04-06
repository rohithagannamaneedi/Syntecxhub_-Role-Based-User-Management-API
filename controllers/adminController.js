const User = require("../models/User");
const AuditLog = require("../models/AuditLog");

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Block / Unblock user
exports.toggleBlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isBlocked = !user.isBlocked;
  await user.save();

  await AuditLog.create({
    action: user.isBlocked ? "BLOCK_USER" : "UNBLOCK_USER",
    performedBy: req.user.id,
    targetUser: user._id
  });

  res.json({ msg: "User status updated" });
};

// Promote to admin
exports.promoteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.role = "admin";
  await user.save();

  await AuditLog.create({
    action: "PROMOTE_USER",
    performedBy: req.user.id,
    targetUser: user._id
  });

  res.json({ msg: "User promoted to admin" });
};