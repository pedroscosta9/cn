const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
  isOnline: Boolean
 // profilePic: Image
});

module.exports = mongoose.model("User", user);