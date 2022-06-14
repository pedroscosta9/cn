const mongoose = require("mongoose");
const room = new mongoose.Schema({
    id: String,
    name: String,
    status: Boolean,
    open : Boolean,
    player_1: String,
    player_2: String,
    winner: String,
    date: Number
});

module.exports = mongoose.model("Room", room);