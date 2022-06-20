const mongoose = require("mongoose");
const game = new mongoose.Schema({
    player_id: String,
    game_state: []
});

module.exports = mongoose.model("Game", game);