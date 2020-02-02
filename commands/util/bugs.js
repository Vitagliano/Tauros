const Discord = require('discord.js');
const config = require("../../config.json");

exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Encontrou um bug? Reporte!")
    .setAuthor("Clique e visite nosso Github", "", "https://github.com/Vitagliano/Tauros")
    .setDescription(
      "Infelizmente, nada é perfeito. Por favor, reporte qualquer atividade anormal do bot e se algum comando não responder."
    )
    .setThumbnail("https://i.imgur.com/AJOST6X.png")
    .addField(
      "Como reportar?",
      "Abra um [issue](https://github.com/Vitagliano/Tauros/issues) no repositório do bot no github."
    )
    .addField("E-mail", "bugs@taurosbot.com")
    .setColor(config.color);
  return message.channel.send(embed);
};

exports.help = {
  name: "bug",
  aliases: ["bugs"],
  description: "Encontrou um bug? Use esse comando e saiba como reportar!",
  category: "Utilidades"
};
