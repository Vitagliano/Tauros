const mongoose = require("mongoose");

const muteSchema = new mongoose.Schema({
  guildID: String,
  userID: String,
  muted: {
    time: Number,
    reason: String,
    mutedBy: String,
  }
});

let Mute = mongoose.model('Mute', muteSchema)
exports.Mute = Mute

//module.exports = mongoose.model("Mute", muteSchema);
