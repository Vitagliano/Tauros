const Discord = require("discord.js");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  const name = client.commands.get("ping").help.name;
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  if (args[0] === "ajuda") {
    const embed = new Discord.RichEmbed()
      .setTitle(`${nameCapitalized}`)
      .setDescription(client.commands.get("ping").help.description)
      .addField(
        "Como usar:",
        `${process.env.prefix}${client.commands.get("ping").help.usage}`
      )
      .setColor(config.color);
    message.channel.send({ embed });
    return;
  }

  bot = message.client;

  e = new Discord.RichEmbed().setTitle("Pong!!").setColor(config.color);

  message.channel.send("Pinging...").then(msg => {
    e.setDescription(
      `\`\`\`css\nBot : ${msg.createdTimestamp -
        message.createdTimestamp}ms\nAPI : ${Math.round(bot.ping)}ms\`\`\``
    );
    msg.edit(e);
  });
};

exports.help = {
  name: "ping",
  description: "Mostra a latencia de conexão entre o bot e a internet",
  usage: "ping",
  category: "Utilidades"
};
