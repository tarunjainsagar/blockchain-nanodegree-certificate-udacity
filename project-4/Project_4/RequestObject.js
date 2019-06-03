/* ===== Request Object Class ==============================
|  Class with a constructor for Request Validation Object  |
|  =======================================================*/

class RequestObject {
  constructor(walletAddr, timestamp) {
    this.walletAddress = walletAddr;
    this.requestTimeStamp = timestamp;
    this.message = walletAddr + ":" + timestamp + ":starRegistry";
    this.validationWindow = 300;
  }
}

module.exports.RequestObject = RequestObject;
