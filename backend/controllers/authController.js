// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req,res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ ok:false, error:'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ ok:false, error:'Email already used' });
    const passwordHash = await bcrypt.hash(password, 10);
    const u = await User.create({ name, email, passwordHash, role: role || 'patient', isApproved: role === 'doctor' ? false : true });
    return res.json({ ok:true, userId: u._id });
  } catch(err){ console.error(err); return res.status(500).json({ ok:false, error:'Server error' }); }
};

exports.login = async (req,res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({ ok:false, error:'Invalid credentials' });
    const ok = await bcrypt.compare(password, u.passwordHash);
    if (!ok) return res.status(400).json({ ok:false, error:'Invalid credentials' });
    if (u.role === 'doctor' && !u.isApproved) return res.status(403).json({ ok:false, error:'Doctor not approved yet' });
    const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ ok:true, token, user: { id:u._id, name:u.name, role:u.role } });
  } catch(err){ console.error(err); return res.status(500).json({ ok:false, error:'Server error' }); }
};
