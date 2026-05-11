// routes/blood.js
const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const BloodUnit = require('../models/BloodUnit');
const { requireAuth, requireRole } = require('../middlewares/auth');

// Add donor (any logged-in user can register donor)
router.post('/donor', requireAuth, async (req, res) => {
  try {
    const { name, phone, bloodGroup } = req.body;
    if (!name || !bloodGroup) {
      return res.status(400).json({ ok: false, message: 'name and bloodGroup are required' });
    }

    const donor = await Donor.create({ name, phone, bloodGroup });
    return res.json({ ok: true, donor });
  } catch (err) {
    console.error('Add donor error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// Add blood unit (admin only)
router.post('/unit', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const { unitId, bloodGroup, donorId } = req.body;
    if (!unitId || !bloodGroup) {
      return res.status(400).json({ ok: false, message: 'unitId and bloodGroup are required' });
    }

    const unit = await BloodUnit.create({ unitId, bloodGroup, donor: donorId || null });
    return res.json({ ok: true, unit });
  } catch (err) {
    console.error('Add unit error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// List blood units (any logged in user)
router.get('/units', requireAuth, async (req, res) => {
  try {
    const units = await BloodUnit.find().populate('donor').lean();
    return res.json({ ok: true, units });
  } catch (err) {
    console.error('List units error:', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

module.exports = router;
