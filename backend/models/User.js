const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    // we keep role flexible but default to patient
    role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
      default: 'patient',
    },

    // for doctors: admin must approve
    isApproved: {
      type: Boolean,
      default: true,       // patient = true by default
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

