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

  isValidRequest(walletAddress) {
    return this.mempoolValid[walletAddress] != undefined;
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
      this.timeoutRequests[walletAddress] = setTimeout(() => {
        this.cleanUpValidationRequest(walletAddress);
      }, TimeoutRequestsWindowTime);
    } else {
      let timeleft = this.updateValidationWindow(walletAddress);
      if (timeleft <= 0) {
        return "Validation Window Expired !!! \nAdd new validation request.";
      }
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
    // If Request if removed from memPool or invalid request
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
        // If valid Message returned by Bitcoin api
        if (isValid) {
          // Add one validMemPool once only; Multiple validation request can made within ValidationWindow
          if (this.mempoolValid[walletAddress] == undefined) {
            this.mempoolValid[
              walletAddress
            ] = new ValidRequestObjectClass.ValidRequestObject(
              requestObject,
              isValid
            );

            // setTimeout(() => {
            //   delete this.mempoolValid[walletAddress];
            // }, requestObject.validationWindow);
          }
          return this.mempoolValid[walletAddress];
        } else {
          return "Invalid signature found !!! \nTry Again with valid details.";
        }
      } else {
        return "Validation Window Expired !!! \nAdd new validation request.";
      }
    }
  }

  cleanUpValidationRequest(walletAddress) {
    delete this.timeoutRequests[walletAddress];
    if (this.mempool[walletAddress] != undefined) {
      delete this.mempool[walletAddress];
    }
  }
}

module.exports.MemPool = MemPool;
