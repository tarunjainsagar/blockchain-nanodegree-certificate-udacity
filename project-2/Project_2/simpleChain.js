/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require("crypto-js/sha256");
//Importing levelSandbox class
const db = require("level")("./chaindata");
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
    // Check Genesis Block
    this.getBlockHeight().then(height => {
      console.log("hello new chain, height: ", height);
      if (height == 0) {
        this.addGenesisBlock();
      }
    });
  }

  // Add Genesis Block
  addGenesisBlock() {
    let genesisBlock = new Block("First Block of Chain - Genesis Block");
    genesisBlock.hash = SHA256(JSON.stringify(genesisBlock)).toString();
    console.log("adding genesis block to chain: ", genesisBlock);
    return this.addNewBlockWithValue(JSON.stringify(genesisBlock));
  }

  getChainLength() {
    return this.getBlockHeight().then(result => {
      return result - 1;
    });
  }

  // Add new block
  addNewBlock(newBlock) {
    return this.getChainLength().then(chainLength => {
      // Block height
      newBlock.height = chainLength + 1;

      // UTC timestamp
      newBlock.time = new Date()
        .getTime()
        .toString()
        .slice(0, -3);

      // Link blocks
      return this.getBlock(chainLength).then(previousBlock => {
        newBlock.previousBlockHash = JSON.parse(previousBlock).hash;
        console.log("after previous hash", newBlock);
        // Block hash with SHA256 using newBlock and converting to a string
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        // Persist Block in levelDB
        return this.addNewBlockWithKeyWithValue(
          newBlock.height,
          JSON.stringify(newBlock)
        ).then(newBlockValue => {
          return newBlockValue;
        });
      });
    });
  }

  // validate block
  validateBlock(blockHeight) {
    console.log("Validating Block at Height : ", blockHeight);
    return new Promise(resolve => {
      // get block object
      return this.getBlock(blockHeight).then(block => {
        console.log("block found is :", block);
        // get block hash
        block = JSON.parse(block);
        let blockHash = block.hash;
        // remove block hash to test block integrity
        block.hash = "";
        // generate block hash
        let validBlockHash = SHA256(JSON.stringify(block)).toString();
        // Compare
        if (blockHash === validBlockHash) {
          console.log("valid");
          resolve(true);
        } else {
          console.log(
            "Block #" +
              blockHeight +
              " invalid hash:\n" +
              blockHash +
              "<>" +
              validBlockHash
          );
          resolve(false);
        }
        // }
      });
    });
  }

  // Validate blockchain
  validateChain() {
    let errorLog = [];
    return new Promise((resolve, reject) => {
      this.getBlockHeight().then(value => {
        // value = blockHeight
        for (var i = value - 1; i >= 1; i--) {
          console.log("iteration no. #", i, "\n");
          // validate block
          this.validateBlock(i).then(result => {
            if (!result) {
              errorLog.push(i);
            } else {
              // compare blocks hash link
              this.getBlock(i).then(currentBlock => {
                this.getBlock(i - 1).then(nextBlock => {
                  if (
                    JSON.parse(currentBlock).previousBlockHash !== JSON.parse(nextBlock).hash
                  ) {
                    errorLog.push(i);
                  }
                });
              });
              if (i == 1) {
                done();
              }
            }
          });
        }

        function done() {
          if (errorLog.length > 0) {
            console.log("Block errors = " + errorLog.length);
            console.log("Blocks: " + errorLog);
            reject(errorLog);
          } else {
            console.log("No errors detected");
            resolve("No errors detected");
          }
        }
      });
    });
  }

  addNewBlockWithKeyWithValue(key, value) {
    return new Promise(function(resolve, reject) {
      db.put(key, value, function(err) {
        if (err) {
          console.log("Block " + key + " submission failed", err);
          reject(err);
        }
        console.log("addNewBlockWithValue: key ", key, " Value: ", value);
        resolve(value);
      });
    });
  }

  // Get data from levelDB with key
  getBlock(key) {
    return new Promise(function(resolve, reject) {
      console.log("Get Block for Key: ", key);
      db.get(key, function(err, value) {
        if (err) {
          if (err.type == "NotFoundError") {
            console.log("Block not found", err);
            reject(err);
          } else {
            console.log("Block " + key + " get failed", err);
            reject(err);
          }
        } else {
          console.log("Found Block at key:", key, " Value:", value);
          resolve(value);
        }
      });
    });
  }

  // Add data to levelDB with value
  addNewBlockWithValue(value) {
    let i = 0;
    let self = this;
    return new Promise(function(resolve, reject) {
      db.createReadStream()
        .on("data", function(data) {
          i++;
        })
        .on("error", function(err) {
          console.log("Unable to read data stream!", err);
          reject(err);
        })
        .on("close", function() {
          console.log("Block #" + i);
          self
            .addNewBlockWithKeyWithValue(i, value)
            .then(function(result) {
              resolve(result);
            })
            .catch(function(err) {
              console.log("error in addNewBlockWithValue");
              reject(err);
            });
        });
    });
  }

  getBlockHeight() {
    let i = 0;
    return new Promise(function(resolve, reject) {
      db.createReadStream()
        .on("data", function(data) {
          i++;
        })
        .on("error", function(err) {
          console.log("Unable to read data stream!", err);
          reject(err);
        })
        .on("close", function() {
          console.log("Block #" + i);
          resolve(i);
        });
    });
  }
}

/* ===== Test Function ==========================
|  Tests for new blockchain 		|
|  ================================================*/

let chain = new Blockchain();

// (function theLoop (i) {
//   setTimeout(function () {
//       let blockTest = new Block("Test Block - " + (i + 1));
//       chain.addNewBlock(blockTest).then((result) => {
//           console.log(result);
//           i++;
//           if (i < 30) theLoop(i);
//       });
//   }, 10000);
// })(0);

// // setTimeout(() => chain.validateChain(), 2000);
// chain.getBlock(0).then(c => {console.log(c)});
// chain.getBlock(1).then(c => {console.log(c)});
// chain.getBlock(2).then(c => {console.log(c)});

// // Check ChainHeight
// chain.getBlockHeight().then(c => {console.log(c)});

// // Check Block Validity
// chain.validateBlock(0).then(c => {console.log(c)});
// chain.validateBlock(1).then(c => {console.log(c)});
// chain.validateBlock(2).then(c => {console.log(c)});

// // Check Chain Validity
// chain.validateChain().then(c => {console.log(c)});
// chain.addNewBlock(new Block('new block 1')).then(c => {console.log(c)});
