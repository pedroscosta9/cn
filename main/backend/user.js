const mongoose = require("mongoose");
const user = new mongoose.Schema({
  username: String,
  password: String,
  isOnline: Boolean
});

module.exports = mongoose.model("User", user);