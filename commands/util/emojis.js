const Discord = require("discord.js");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  let emotes = new Discord.RichEmbed()
    .setTitle("Emojis")
    .setThumbnail("https://i.imgur.com/KGmBrSk.png")
    .setDescription(message.guild.emojis.map(c => c).join("\u2006\u2006"))
    .setColor(config.color);
  message.channel.send(emotes);
};

exports.help = {
  name: "emojis",
  description: "Lista todos os emojis adicionados na guilda",
  usage: "emojis",
  category: "Utilidades"
};
