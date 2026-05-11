// controllers/adminController.js
const User = require('../models/User');

exports.listPendingDoctors = async (req,res) => {
  const pending = await User.find({ role:'doctor', isApproved:false }).select('-passwordHash');
  res.json({ ok:true, pending });
};

exports.approveDoctor = async (req,res) => {
  const { doctorId } = req.body;
  const doc = await User.findById(doctorId);
  if (!doc || doc.role !== 'doctor') return res.status(400).json({ ok:false, error:'Doctor not found' });
  doc.isApproved = true;
  await doc.save();
  res.json({ ok:true, message:'Approved' });
};
