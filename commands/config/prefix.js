const Discord = require("discord.js");
const config = require("../../config.json");

exports.run = async (client, message, args, settings) => {
  let updated = args[0];

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    embed = new Discord.RichEmbed()
      .setTitle("Sem Permissão")
      .setDescription("Você não tem permissão para executar esse comando.")
      .setColor(config.color)
      .setThumbnail("https://i.imgur.com/s7nhucA.png");
    message.channel.send({ embed });
  } else {
    if (updated) {
      try {
        await client.updateGuild(message.guild, { prefix: updated });
        return message.channel.send(
          `O prefix foi atualizado para: \`${updated}\``
        );
      } catch (error) {
        console.error(error);
        message.channel.send(`Um erro aconteceu: **${error.message}**`);
      }
    }

    message.channel.send(`Prefix atual: \`${settings.prefix}\``);
  }
};

exports.help = {
  name: "prefix",
  description: "Define o prefix do bot na guilda",
  usage: "prefix help",
  category: "Configuração"
};
