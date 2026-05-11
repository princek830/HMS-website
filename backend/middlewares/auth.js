// middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ ok:false, error: 'Missing auth' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select('-passwordHash');
    next();
  } catch (err) {
    return res.status(401).json({ ok:false, error: 'Invalid token' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ ok:false, error: 'Not logged in' });
  if (req.user.role !== role) return res.status(403).json({ ok:false, error: 'Forbidden' });
  next();
};

module.exports = { requireAuth, requireRole };
