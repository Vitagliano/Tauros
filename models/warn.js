const mongoose = require("mongoose");

const warnSchema = new mongoose.Schema({
  guildID: String,
  userID: String,
  reason: String,
});

let Warn = mongoose.model('Warn', warnSchema)
exports.Warn = Warn

