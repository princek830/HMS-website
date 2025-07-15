let blockchain = [];

function createGenesisBlock() {
  return {
    index: 0,
    timestamp: new Date().toISOString(),
    data: "Genesis Block",
    previousHash: "0",
    hash: generateHash(0, new Date().toISOString(), "Genesis Block", "0")
  };
}

function generateHash(index, timestamp, data, previousHash) {
  return btoa(index + timestamp + JSON.stringify(data) + previousHash);
}

function addBlock(name, data) {
  const previousBlock = blockchain[blockchain.length - 1];
  const newBlock = {
    index: blockchain.length,
    timestamp: new Date().toISOString(),
    data,
    previousHash: previousBlock.hash,
    hash: generateHash(blockchain.length, new Date().toISOString(), data, previousBlock.hash)
  };
  blockchain.push(newBlock);
  return newBlock;
}

function getBlockchain() {
  return blockchain;
}

// Initialize with genesis block
blockchain.push(createGenesisBlock());
