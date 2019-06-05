/* ===== Star Object Class ==============================
|  Class with a constructor for Star Object  |
|  =======================================================*/
const bufferFrom = require("buffer-from");

class StarObject {
  constructor(star) {
    this.ra = star.ra;
    this.dec = star.dec;
    this.mag = star.mag;
    this.cen = star.cen;
    this.story = bufferFrom(star.story).toString("hex");
  }
}

module.exports.StarObject = StarObject;
