/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require("crypto-js/sha256");
//Importing levelSandbox class
const db = require("level")("./chaindata");
const BlockClass = require("./Block.js");

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
    let genesisBlock = new BlockClass.Block("First Block of Chain - Genesis Block");
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

  verifyBlockWithLink(blockHeight) {
    return new Promise((resolve, reject) => {
      // place here your logic
      // return resolve([result object]) in case of success
      // return reject([error object]) in case of error
      this.validateBlock(blockHeight).then(valid => {
        if (!valid) {
          reject("Invalid Block found at height :", blockHeight);
        } else {
          // compare blocks hash link
          this.getBlock(blockHeight)
            .then(currentBlock => {
              this.getBlock(blockHeight - 1)
                .then(previousBlock => {
                  if (
                    JSON.parse(currentBlock).previousBlockHash !=
                    JSON.parse(previousBlock).hash
                  ) {
                    reject("Invalid Block Link found at height :", blockHeight);
                  } else {
                    resolve("Valid Block at Height: ", blockHeight);
                  }
                })
                .catch(err => {
                  reject(
                    "Failed to Previous Get Block at Height: ",
                    blockHeight,
                    err
                  );
                });
            })
            .catch(err => {
              reject("Failed to Get Block at Height: ", blockHeight, err);
            });
        }
      });
    });
  }

  // Validate blockchain
  validateChain() {
    return this.getBlockHeight().then(async height => {
      console.log("BlockHeight at Validate Chain:", height);
      let success = true;
      for (var i = height - 1; i > 1; i--) {
        try {
          console.log("Validating for height:", i);
          await this.verifyBlockWithLink(i);
        } catch (e) {
          console.log("Found error :", e);
          success = false;
        }
      }

      return success;
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

module.exports.BlockChain = Blockchain;