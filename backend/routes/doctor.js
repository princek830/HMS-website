// routes/doctor.js
const express = require('express');
const router = express.Router();

// Placeholder doctor endpoints

router.post('/register', (req, res) => {
  return res.json({ ok: true, message: 'doctor register placeholder' });
});

router.get('/profile/:id', (req, res) => {
  return res.json({ ok: true, message: `doctor profile placeholder ${req.params.id}` });
});

module.exports = router;
