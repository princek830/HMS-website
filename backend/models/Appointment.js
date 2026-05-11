const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientId: { 
    type: String, 
    required: true 
  },

  doctorId: {
    type: String,
    required: true
  },

  date: { 
    type: Date, 
    required: true 
  },

  timeSlot: { 
    type: String 
  },

  reason: { 
    type: String 
  },

  status: { 
    type: String, 
    enum: ['pending','confirmed','rescheduled','cancelled'], 
    default: 'pending' 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);