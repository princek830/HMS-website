// models/Donor.js
const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  dob: { type: Date },
  bloodGroup: { type: String, required: true },
  lastDonationDate: { type: Date },
  eligibility: { type: String, enum: ['pending', 'eligible', 'ineligible'], default: 'pending' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donor', DonorSchema);
