const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  action: String,
  performedBy: String,
  targetUser: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AuditLog", auditSchema);