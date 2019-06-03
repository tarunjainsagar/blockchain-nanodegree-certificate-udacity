const RequestObjectClass = require("./RequestObject.js");
/* ===== Request Object Class ==============================
|  Class with a constructor for Request Validation Object  |
|  =======================================================*/

class StatusClass extends RequestObjectClass.RequestObject {
  constructor(requestObject, valid) {
    super(
      requestObject.walletAddress,
      requestObject.requestTimeStamp,
      requestObject.validationWindow
    );
    this.messageSignature = valid;
  }
}

class ValidRequestObject {
  constructor(requestObject, valid) {
    this.registerStar = valid;
    this.status = new StatusClass(requestObject, valid);
  }
}

module.exports.ValidRequestObject = ValidRequestObject;
