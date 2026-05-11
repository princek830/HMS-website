
const mongoose = require('mongoose');

const TransfusionSchema = new mongoose.Schema({
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodUnit', required: true },
  patientId: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hospitalId: { type: String },
  timestamp: { type: Date, default: Date.now },
  reaction: { type: String }
});

module.exports = mongoose.model('Transfusion', TransfusionSchema);
