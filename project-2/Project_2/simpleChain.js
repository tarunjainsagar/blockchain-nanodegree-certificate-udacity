/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require("crypto-js/sha256");
//Importing levelSandbox class
const LevelSandboxClass = require("./levelSandbox.js");
// Creating the levelSandbox class object
const levelDB = new LevelSandboxClass.LevelSandbox();

/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

class Block {
  constructor(data) {
    (this.hash = ""),
      (this.height = 0),
      (this.body = data),
      (this.time = 0),
      (this.previousBlockHash = "");
  }
}

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain {
  constructor() {
    this.chain = levelDB;
    addGenesisBlock();
  }

  // Add Genesis Block
  addGenesisBlock() {
    let genesisBlock = new Block("First Block of Chain - Genesis Block");
    genesisBlock.hash = SHA256(JSON.stringify(genesisBlock)).toString();

    return new Promise(function(resolve, reject) {
      this.chain.addDataToLevelDB(genesisBlock, function(err, value) {
        if (err) {
          console.log("Failed to Add Genesis Block!", err);
          reject(err);
        } else {
          console.log("Block added to chain:", value);
          resolve(value);
        }
      });
    });
  }

  // Add new block
  addBlock(newBlock) {
    let chainLength = getBlockHeight();
    // Check Genesis Block
    if (chainLength == 0) {
      addGenesisBlock();
      chainLength = chainLength + 1;
    }

    // Block height
    newBlock.height = chainLength + 1;
    // UTC timestamp
    newBlock.time = new Date()
      .getTime()
      .toString()
      .slice(0, -3);

    // Link blocks
    newBlock.previousBlockHash = this.chain.getLevelDBData(
      newBlock.height - 1
    ).hash;

    // Block hash with SHA256 using newBlock and converting to a string
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();

    // Persist Block in levelDB
    return new Promise(function(resolve, reject) {
      this.chain.addDataToLevelDB(
        newBlock.height,
        JSON.stringify(newBlock).toString
      ),
        function(err, value) {
          if (err) {
            console.log("Failed to Add Block to chain!", err);
            reject(err);
          } else {
            console.log("Block added to chain:", value);
            resolve(value);
          }
        };
    });
  }

  // Get block height
  getBlockHeight() {
    return new Promise(function(resolve, reject){
      this.chain.getBlocksCount(function(err, value) {
        if (err) {
          console.log("Failed to Block Height!", err);
          reject(err);
        } else {
          resolve(value);
        }
      })
    });
  }

  // get block
  getBlock(blockHeight) {
    return new Promise(function(resolve, reject) {
      this.chain.getLevelDBData(blockHeight, function(err, value) {
        if (err) {
          if (err.type == "NotFoundError") {
            resolve(undefined);
          } else {
            console.log("Block " + key + " get failed", err);
            reject(err);
          }
        } else {
          resolve(value);
        }
      });
    });
  }

  // validate block
  validateBlock(blockHeight) {
    // get block object
    let block = this.getBlock(blockHeight);
    // get block hash
    let blockHash = block.hash;
    // remove block hash to test block integrity
    block.hash = "";
    // generate block hash
    let validBlockHash = SHA256(JSON.stringify(block)).toString();
    // Compare
    if (blockHash === validBlockHash) {
      return true;
    } else {
      console.log(
        "Block #" +
          blockHeight +
          " invalid hash:\n" +
          blockHash +
          "<>" +
          validBlockHash
      );
      return false;
    }
  }

  // Validate blockchain
  validateChain() {
    let errorLog = [];
    for (var i = 0; i < this.chain.length - 1; i++) {
      // validate block
      if (!this.validateBlock(i)) errorLog.push(i);
      // compare blocks hash link
      let blockHash = this.chain[i].hash;
      let previousHash = this.chain[i + 1].previousBlockHash;
      if (blockHash !== previousHash) {
        errorLog.push(i);
      }
    }
    if (errorLog.length > 0) {
      console.log("Block errors = " + errorLog.length);
      console.log("Blocks: " + errorLog);
    } else {
      console.log("No errors detected");
    }
  }
}
