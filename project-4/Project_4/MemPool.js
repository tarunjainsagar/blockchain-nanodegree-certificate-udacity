var bitcoin = require('bitcoinjs-lib') // v3.x.x
const bs58check = require("bs58check");
const bitcoinMessage = require("bitcoinjs-message");
const RequestObjectClass = require("./RequestObject.js");
const ValidRequestObjectClass = require("./ValidRequestObject.js");
/* ===== Request Object Class ==============================
|  Class with a constructor for Request Validation Object  |
|  =======================================================*/
const TimeoutRequestsWindowTime = 5 * 60 * 1000;

class MemPool {
  constructor() {
    console.log("Initialized Mem Pool ...");
    this.mempool = [];
    this.mempoolValid = [];
    this.timeoutRequests = [];
  }

  getCurrentTimeStamp() {
    return new Date()
      .getTime()
      .toString()
      .slice(0, -3);
  }

  addRequestValidation(walletAddress) {
    // If resubmitted request, then do no add again
    if (typeof this.mempool[walletAddress] === "undefined") {
      let requestObject = new RequestObjectClass.RequestObject(
        walletAddress,
        this.getCurrentTimeStamp(),
        TimeoutRequestsWindowTime / 1000
      );

      // Add request to mempool
      this.mempool[walletAddress] = requestObject;

      // Set Timeout for request
      this.timeoutRequests[walletAddress] = setTimeout(function() {
        this.mempool.splice(walletAddress);
      }, TimeoutRequestsWindowTime);
    } else {
      this.updateValidationWindow(walletAddress);
    }
    return this.mempool[walletAddress];
  }

  updateValidationWindow(walletAddress) {
    let timeElapse =
      this.getCurrentTimeStamp() - this.mempool[walletAddress].requestTimeStamp;
    let timeLeft = TimeoutRequestsWindowTime / 1000 - timeElapse;
    this.mempool[walletAddress].validationWindow = timeLeft;
    return timeLeft;
  }

  validateRequestByWallet(walletAddress, signature) {
    let requestObject = this.mempool[walletAddress];
    console.log(requestObject);
    // If Request if removed from memPool or request was never added to mempool
    if (requestObject == undefined) {
      return "Invalid validate request, No such wallet address found !!!";
    } else {
      // Verify windowTime
      let windowTime = this.updateValidationWindow(walletAddress);
      if (windowTime > 0) {
        let isValid = bitcoinMessage.verify(
          requestObject.message,
          walletAddress,
          signature
        );
        // // If valid Message returned by Bitcoin api
        if (isValid) {
          this.mempoolValid[
            requestObject.walletAddress
          ] = new ValidRequestObjectClass.ValidRequestObject(
            requestObject,
            isValid
          );

          // Clean up timeOut Array
          this.cleanUpValidationRequest(requestObject.walletAddress);

          return this.mempoolValid[requestObject.walletAddress];
        }
      } else {
        return "Validation Window Expired !!! \nAdd new validation request.";
      }
    }
  }

  cleanUpValidationRequest(walletAddress) {
    this.timeoutRequests.splice(walletAddress);
    this.mempool.splice(walletAddress);
  }
}

module.exports.MemPool = MemPool;
