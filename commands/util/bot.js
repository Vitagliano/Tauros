const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const config = require("../../config.json");
const cpuStat = require("cpu-stat");
const guildsDB = require("../../models/guild");

exports.run = async (client, message, args) => {
  guildsDB.findOne({ guildID: message.guild.id }, function(err, doc) {
    try {
      let duration = moment
        .duration(client.uptime)
        .format("D [d], H [h], m [m], s [s]");
      avatar = message.author.avatarURL;
      moment.locale("pt-BR");
      cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const commands = client.commands.size;
        let date = formatDate("DD/MM/YYYY, às HH:mm:ss", client.user.createdAt);
        const embed = new Discord.RichEmbed()

          .setAuthor(
            message.client.user.username,
            message.client.user.displayAvatarURL
          )
          .setFooter(
            `Comando executado por ${message.author.username}`,
            message.author.avatarURL
          )
          .setTimestamp()
          .setColor(config.color, true)
          .addField(`**Criador  **`, `\`\`\`js\nVitagliano#8378\`\`\``, true)
          .addField(`**Data de Criação  **`, `\`\`\`js\n${date}\`\`\``, true)
          .addField(
            `**Guilds  **`,
            `\`\`\`js\n${client.guilds.size}\`\`\``,
            true
          )
          .addField(
            `**Usuários  **`,
            `\`\`\`js\n${client.users.size}\`\`\``,
            true
          )
          .addField(
            `**Canais  **`,
            `\`\`\`js\n${client.channels.size}\`\`\``,
            true
          )
          .addField(
            `**Uso de CPU  **`,
            `\`\`\`js\n${percent.toFixed(2)}%\`\`\``,
            true
          )
          .addField(
            `**Emojis  **`,
            `\`\`\`js\n${client.emojis.size.toLocaleString()}\`\`\``,
            true
          )
          .addField(
            `**Estou online há  **`,
            `\`\`\`js\n${duration}\`\`\``,
            true
          )
          .addField(
            `**Ping  **`,
            `\`\`\`js\n${Math.round(client.ping)}ms\`\`\``,
            true
          )
          .addField(
            `**Prefixo no Servidor  **`,
            `\`\`\`js\n${doc.prefix}\`\`\``,
            true
          )
          .addField(
            `**Total de Comandos:  **`,
            `\`\`\`js\n${commands}\`\`\``,
            true
          );

        message.channel.send(embed);
      });
    } catch (e) {
      console.log(`Erro - Command BotInfo\n${e}`);
    }
  });
};

function formatDate(template, date) {
  var specs = "YYYY:MM:DD:HH:mm:ss".split(":");
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce(function(template, item, i) {
      return template.split(specs[i]).join(item);
    }, template);
}

exports.help = {
  name: "botinfo",
  aliases: ["bot"],
  category: "Utilidades"
};
