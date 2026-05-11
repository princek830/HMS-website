// utils/blockchain.js
const crypto = require('crypto');
const BlockchainLog = require('../models/BlockchainLog');

function makeHash(obj) {
  return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
}

async function appendLog({ action, actor, data }) {
  // get last block
  const last = await BlockchainLog.findOne().sort({ timestamp: -1 }).lean();
  const prevHash = last ? last.hash : null;

  const block = {
    timestamp: new Date(),
    action,
    actor,
    data,
    prevHash
  };
  block.hash = makeHash(block);
  const saved = await BlockchainLog.create(block);
  return saved;
}

module.exports = { appendLog };
