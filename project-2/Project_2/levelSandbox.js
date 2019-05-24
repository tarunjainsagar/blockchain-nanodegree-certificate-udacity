/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/
// Importing the module 'level'
const level = require("level");
// Declaring the folder path that store the data
const chainDB = "./chaindata";
// Declaring a class
class LevelSandbox {
  // Declaring the class constructor
  constructor() {
    this.db = level(chainDB);
  }

  // Add data to levelDB with key/value pair
  addLevelDBData(key, value) {
    let self = this;
    return new Promise(function(resolve, reject) {
      self.db.put(key, value, function(err) {
        if (err) {
          console.log("Block " + key + " submission failed", err);
          reject(err);
        }
        resolve(value);
      });
    });
  }

  // Get data from levelDB with key
  getLevelDBData(key) {
    let self = this;
    return new Promise(function(resolve, reject) {
      self.db.get(key, function(err, value) {
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

  // Add data to levelDB with value
  addDataToLevelDB(value) {
    let i = 0;
    let self = this;

    return new Promise(function(resolve, reject) {
      self.db
        .createReadStream()
        .on("data", function(data) {
          i++;
        })
        .on("error", function(err) {
          console.log("Unable to read data stream!", err);
          reject(err);
        })
        .on("close", function() {
          console.log("Block #" + i);
          addLevelDBData(i, value);
        });
    });
  }

  getBlocksCount() {
    let i = 0;
    let self = this;

    return new Promise(function(resolve, reject) {
      self.db
        .createReadStream()
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

// Export the class
module.exports.LevelSandbox = LevelSandbox;
