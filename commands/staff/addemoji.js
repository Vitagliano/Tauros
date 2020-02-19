const Discord = require("discord.js");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  const name = client.commands.get("addemoji").help.name;
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    embed = new Discord.RichEmbed()
      .setTitle("Sem Permissão")
      .setDescription("Você não tem permissão para executar esse comando.")
      .setColor(config.color)
      .setThumbnail("https://i.imgur.com/s7nhucA.png");
    message.channel.send({ embed });
  }

  message.guild.createEmoji(args[0], args[1]);
  const embed = new Discord.RichEmbed()
    .setTitle("Emoji adicionado")
    .setDescription(`O emoji \`${args[1]}\` foi adicionado!`)
    .setThumbnail(args[0])
    .setColor(config.color)
    .setFooter(`Emoji adicionado por ${message.author.username}`)
    .setTimestamp();
  message.channel.send(embed);
};

exports.help = {
  name: "addemoji",
  description: "Adiciona um emoji ao servidor",
  usage: "addemoji [url] [nome]",
  category: "Staff"
};
