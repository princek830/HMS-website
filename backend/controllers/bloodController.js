// controllers/bloodController.js
const Donor = require('../models/Donor');
const BloodUnit = require('../models/BloodUnit');
const Transfusion = require('../models/Transfusion');
const { appendLog } = require('../utils/blockchain');

exports.addDonor = async (req,res) => {
  const d = await Donor.create(req.body);
  await appendLog({ action:'donor_added', actor: req.user?.email || 'system', data: d });
  res.json({ ok:true, donor: d });
};

exports.addUnit = async (req,res) => {
  const { unitId, bloodGroup, donorId } = req.body;
  const u = await BloodUnit.create({ unitId, bloodGroup, donor: donorId });
  await appendLog({ action:'unit_added', actor: req.user?.email || 'system', data: u });
  res.json({ ok:true, unit: u });
};

exports.listUnits = async (req,res) => {
  const units = await BloodUnit.find().populate('donor').lean();
  res.json({ ok:true, units });
};

exports.requestTransfusion = async (req,res) => {
  const { patientName, patientId, bloodGroup } = req.body;
  // simple: find first available unit with bloodGroup
  const unit = await BloodUnit.findOneAndUpdate({ bloodGroup, status:'available' }, { status:'reserved' }, { new: true });
  if (!unit) return res.status(400).json({ ok:false, error:'No unit available' });
  const t = await Transfusion.create({ patientName, patientId, unit: unit._id, requestedBy: req.user?._id });
  await appendLog({ action:'transfusion_requested', actor: req.user?.email || 'system', data: { transfusionId: t._id, unit: unit.unitId } });
  res.json({ ok:true, transfusion: t, unit });
};

exports.completeTransfusion = async (req,res) => {
  const { transfusionId } = req.body;
  const t = await Transfusion.findById(transfusionId).populate('unit');
  if (!t) return res.status(404).json({ ok:false, error:'Not found' });
  t.status = 'completed';
  await t.save();
  t.unit.status = 'issued';
  await t.unit.save();
  await appendLog({ action:'transfusion_completed', actor: req.user?.email || 'system', data: { transfusionId: t._id } });
  res.json({ ok:true, transfusion: t });
};
