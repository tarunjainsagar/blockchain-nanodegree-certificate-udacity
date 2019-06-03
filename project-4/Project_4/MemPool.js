const RequestObjectClass = require("./RequestObject.js");

/* ===== Request Object Class ==============================
|  Class with a constructor for Request Validation Object  |
|  =======================================================*/

class MemPool {
  constructor(walletAddr, timestamp) {
    console.log("Initialized Mem Pool ...")
    this.mempool = [];
    this.timeoutRequests = [];
  }

  addRequestValidation(requestObject) {
    this.mempool[requestObject.walletAddress] = requestObject;
    this.timeoutRequests[requestObject.walletAddress] = requestObject.requestTimeStamp;
    return this.mempool[requestObject.walletAddress];
  }
}

module.exports.MemPool = MemPool;
