const Discord = require("discord.js");
const config = require("../config.json");

exports.run = async (client, message, args) => {
  const name = client.commands.get("base").help.name;
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  if (args[0] === "ajuda" || "help") {
    const embed = new Discord.RichEmbed()
      .setTitle(`${nameCapitalized}`)
      .setDescription(client.commands.get("base").help.description)
      .addField(
        "Como usar:",
        `${process.env.PREFIX}${client.commands.get("base").help.usage}`
      )
      .setThumbnail("https://i.imgur.com/QxxuwS7.png")
      .setColor(config.color);
    message.channel.send({ embed });
    return;
  }

  const embed = new Discord.RichEmbed()
    .setTitle("Em breve")
    .setColor(config.color);
  message.channel.send({ embed });
};

exports.help = {
  name: "base",
  description: "Uma base para futuros comandos",
  usage: "base",
  category: "Base"
};
