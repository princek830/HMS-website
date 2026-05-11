// routes/admin.js
const express = require('express');
const router = express.Router();
const { requireAuth, requireRole } = require('../middlewares/auth');
const User = require('../models/User');

// Get pending doctors (admin only)
router.get('/doctors/pending', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const pendingDocs = await User.find({ role: 'doctor', isApproved: false }).select('-passwordHash');
    return res.json({ ok: true, pending: pendingDocs });
  } catch (err) {
    console.error('Pending doctors error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// Approve doctor (admin only)
router.post('/doctors/approve', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { doctorId } = req.body;
    if (!doctorId) {
      return res.status(400).json({ ok: false, message: 'doctorId is required' });
    }

    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ ok: false, message: 'Doctor not found' });
    }

    doctor.isApproved = true;
    await doctor.save();

    return res.json({ ok: true, message: 'Doctor approved successfully' });
  } catch (err) {
    console.error('Approve doctor error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

module.exports = router;
