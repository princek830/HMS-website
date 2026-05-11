// models/BloodUnit.js
const mongoose = require('mongoose');

const BloodUnitSchema = new mongoose.Schema({
  unitId: { type: String, required: true, unique: true },
  bloodGroup: { type: String, required: true },
  component: { type: String, enum: ['Whole Blood','RBC','Plasma','Platelets'], default: 'Whole Blood' },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
  collectionDate: { type: Date },
  expiryDate: { type: Date },
  status: { type: String, enum: ['available','reserved','issued','discarded'], default: 'available' },
  hospitalId: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BloodUnit', BloodUnitSchema);
