// models/BlockchainLog.js
const mongoose = require('mongoose');

const BlockchainLogSchema = new mongoose.Schema({
  index: { type: Number },
  timestamp: { type: Date },
  data: { type: mongoose.Schema.Types.Mixed },
  prevHash: { type: String },
  hash: { type: String }
});

module.exports = mongoose.model('BlockchainLog', BlockchainLogSchema);
