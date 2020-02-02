const Discord = require("discord.js");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  const name = client.commands.get("prnt").help.name;
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  if (args[0] === "ajuda") {
    const embed = new Discord.RichEmbed()
      .setTitle(`${nameCapitalized}`)
      .setDescription(client.commands.get("prnt").help.description)
      .addField(
        "Como usar:",
        `${config.BOT_PREFIX}${client.commands.get("prnt").help.usage}`
      )
      .setColor(config.color);
    message.channel.send({ embed });
    return;
  }

  function gerarimg() {
    let caracteres = "abcdefghijklmnopqrstuvxwyz0123456789";
    const limite = 6;

    let result = "";

    for (let x = 0; x < limite; x++) {
      result += caracteres.split("")[
        Math.floor(Math.random() * caracteres.split("").length)
      ];
    }

    message.reply("https://prnt.sc/" + result);
  }

  gerarimg();
  
};

exports.help = {
  name: "prnt",
  description: "Uma prnt para futuros comandos",
  usage: "prnt",
  category: ["Diversão"]
};
