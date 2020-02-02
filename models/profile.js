const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  guildID: String,
  guildName: String,
  userID: String,
  username: String,
  coins: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 0
  },
  xp: {
    type: Number,
    default: 0
  },
  boosters: [{ name: String, time: String }],
  daily: {
    type: String,
    default: "0000"
  },
  blacklist: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Profile", profileSchema);
