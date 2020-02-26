const Discord = require("discord.js");
const config = require("../../config.json");

exports.run = async (client, message, args) => {

  const embed = new Discord.RichEmbed()
    .setTitle("Você quer ajuda?")
    .setDescription("Procure um psicologo!")
    .setColor(config.color)
    .setImage("https://media.giphy.com/media/aOL3fsoTtf5yU/giphy.gif");
  message.channel.send({ embed });
};

exports.help = {
  name: "help",
  description: "Uma base para futuros comandos",
  usage: "help",
  category: "Utilidades"
};
