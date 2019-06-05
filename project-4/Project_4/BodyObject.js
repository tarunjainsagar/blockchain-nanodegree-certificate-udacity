const StarObjectClass = require("./StarObject.js");
/* ===== Body Object Class ==============================
|  Class with a constructor for Request Validation Object  |
|  =======================================================*/
class StarWrapperObject extends StarObjectClass.StarObject {
  constructor(star) {
    super(star);
  }
}

class BodyObject {
  constructor(address, star) {
    this.star = new StarWrapperObject(star);
    this.address = address;
  }
}

module.exports.BodyObject = BodyObject;
