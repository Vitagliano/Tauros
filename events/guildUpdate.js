const Discord = require("discord.js");
const config = require("../config.json")

exports.name = "guildUpdate";
exports.run = (client, oldGuild, newGuild) => {
  if (oldGuild.name !== newGuild.name) {
    client.updateGuild(newGuild, { guildName: newGuild.name })
  }
};
