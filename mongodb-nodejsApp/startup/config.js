const config = require("config");
module.exports = function() {
  // check if the jwtPrivateKey is present
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
