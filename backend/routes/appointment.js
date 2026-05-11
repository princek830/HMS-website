const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book appointment
router.post('/book', async (req, res) => {
  try {
    const { patientId, doctorId, date, timeSlot } = req.body;

    if (!patientId || !doctorId || !date || !timeSlot) {
      return res.status(400).json({
        ok: false,
        message: "All fields are required"
      });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      timeSlot
    });

    return res.json({
      ok: true,
      message: "Appointment booked successfully",
      appointment
    });

  } catch (err) {
    console.error("Appointment booking error:", err);
    return res.status(500).json({
      ok: false,
      message: "Server error while booking appointment"
    });
  }
});


// Get all appointments
router.get('/list', async (req, res) => {
  try {
    const appts = await Appointment.find().sort({ createdAt: -1 });

    return res.json({
      ok: true,
      appts
    });

  } catch (err) {
    console.error("Fetch appointment error:", err);
    return res.status(500).json({
      ok: false,
      message: "Error fetching appointments"
    });
  }
});

module.exports = router;