const Discord = require("discord.js");
const config = require("../../config.json");
const guildsDB = require("../../models/guild");

exports.run = async (bot, message, args) => {
  guildsDB.findOne({ guildID: message.guild.id }, function(err, doc) {
    embed = new Discord.RichEmbed()
      .setTitle("Sem Permissão")
      .setDescription("Você não tem permissão para executar esse comando.")
      .setColor(config.color)
      .setThumbnail("https://i.imgur.com/s7nhucA.png");
    if (
      !message.member.roles.some(r =>
        [`${doc.role.modRole}`, `${doc.role.adminRole}`].includes(r.id)
      )
    )
      return message.channel.send({ embed });
    else {
      if (doc.channel.punishChannel.enabled === false) {
        const embed = new Discord.RichEmbed()
          .setTitle("Canal de Punições Desativado")
          .setDescription(
            `Ative o canal de punições utilizando \`${process.env.PREFIX}channel punish on\``
          )
          .setColor(config.color);
        message.channel.send({ embed });
        return;
      }

      if (doc.channel.punishChannel.channelID === "Nenhum") {
        const embed = new Discord.RichEmbed()
          .setTitle("Canal de Punições Desconfigurado")
          .setDescription(
            `Configure e ative o canal de punições utilizando \`${process.env.PREFIX}channel punish <channel mention>\``
          )
          .setColor(config.color);
        message.channel.send({ embed });
        return;
      }

      if (
        doc.channel.punishChannel.channelID ||
        doc.channel.punishChannel.enabled === true
      ) {
        let motivo = args.slice(1).join(" ");
        let member = message.mentions.users.first() || bot.users.get(args[0]);

        if (message.mentions.users.size === 0) {
          return message.reply(
            "por favor, mencione um usuário para ser banido!"
          );
        }

        let banmember = message.guild.member(message.mentions.users.first());
        if (!banmember) {
          message.reply("este usuário não pode ser banido!");
        }

        if (!motivo) {
          message.reply("insira o motivo da punição");
          return;
        }

        const confirm = new Discord.RichEmbed()
          .setTitle("Confirmar punição")
          .setDescription(
            `**Cheque a punição a ser aplicada:**\n
          \`Membro:\` ${member}
          \`Motivo:\` ${motivo}`
          )
          .setColor(config.color)
          .setTimestamp()
          .setFooter(
            `Punido por: ${message.author.username}`,
            message.author.avatarURL
          );
        message.channel.send(confirm).then(async msg => {
          await msg.react(config.sim);
          await msg.react(config.nao);
          const filter = (reaction, user) =>
            [config.sim, config.nao].includes(reaction.emoji.id) &&
            user.id === message.author.id;
          const collector = msg.createReactionCollector(filter);
          collector.on("collect", r => {
            switch (r.emoji.id) {
              case config.sim:
                msg.delete();
                msg.reply(
                  `você confirmou a punição de ${member}, cheque o canal <#${doc.channel.punishChannel.channelID}>`
                );
                const embed = new Discord.RichEmbed()
                  .setDescription(`**Banimento**`)
                  .setColor(color.config)
                  .addField("Usuário", `${member}`, true)
                  .addField("Staff", message.author.username, true)
                  .setThumbnail(member.displayAvatarURL)
                  .addField("Motivo", `${motivo}`, true)
                  .setFooter(`${member.id}`)
                  .setTimestamp();

                message.guild.channels
                  .get(doc.channel.punishChannel.channelID)
                  .send(embed);

                message.guild.member(member).ban(motivo);

                break;
              case config.nao:
                msg
                  .delete()
                  .then(
                    message.channel.send(`Essa foi por pouco né ${member}?`)
                  );
                break;
            }
          });
        });
      }
    }
  });
};

exports.help = {
  name: "ban",
  aliases: ["banir"],
  category: ["Staff"]
};
