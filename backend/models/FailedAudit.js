const mongoose = require('mongoose');

const FailedAuditSchema = new mongoose.Schema({
  data: { type: mongoose.Schema.Types.Mixed },
  error: { type: String },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FailedAudit', FailedAuditSchema);
