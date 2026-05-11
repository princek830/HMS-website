// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ===========================
// POST /api/auth/signup
// ===========================
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Name, email and password are required',
      });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        ok: false,
        message: 'Email is already registered',
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash,
      role: role || 'patient',
      isApproved: role === 'doctor' ? false : true, // doctors need admin approval
    });

    return res.status(201).json({
      ok: true,
      userId: user._id,
      role: user.role,
      isApproved: user.isApproved,
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res
      .status(500)
      .json({ ok: false, message: 'Server error during signup' });
  }
});

// ===========================
// POST /api/auth/login
// ===========================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Email and password are required',
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: 'Invalid email or password' });
    }

    // Check password
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res
        .status(400)
        .json({ ok: false, message: 'Invalid email or password' });
    }

    // If doctor is not approved yet
    if (user.role === 'doctor' && !user.isApproved) {
      return res.status(403).json({
        ok: false,
        message: 'Doctor account is pending admin approval',
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'devsecret',
      { expiresIn: '7d' }
    );

    return res.json({
      ok: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res
      .status(500)
      .json({ ok: false, message: 'Server error during login' });
  }
});

module.exports = router;
