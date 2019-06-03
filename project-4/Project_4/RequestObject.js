/* ===== Request Object Class ==============================
|  Class with a constructor for Request Validation Object  |
|  =======================================================*/

class RequestObject {
  constructor(walletAddr, timestamp, timeLeft) {
    this.walletAddress = walletAddr;
    this.requestTimeStamp = timestamp;
    this.message = walletAddr + ":" + timestamp + ":starRegistry";
    this.validationWindow = timeLeft;
  }
}

module.exports.RequestObject = RequestObject;
