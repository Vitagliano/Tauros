const Discord = require("discord.js");
const config = require("../../config.json");
const guildsDB = require("../../models/guild");
const muteDB = require("../../models/mute");
const ms = require("ms");

exports.run = async (client, message, args) => {
  guildsDB.findOne({ guildID: message.guild.id }, async function(err, doc) {
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
            `Ative o canal de Punições utilizando \`${process.env.PREFIX}channel punish on\``
          )
          .setColor(config.color);
        message.channel.send({ embed });
        return;
      }

      if (doc.channel.punishChannel.channelID === "Nenhum") {
        const embed = new Discord.RichEmbed()
          .setTitle("Canal de Punições Desconfigurado")
          .setDescription(
            `Configure e ative o canal de Punições utilizando \`${process.env.PREFIX}channel punish <channel mention>\``
          )
          .setColor(config.color);
        message.channel.send({ embed });
        return;
      }

      if (!doc.role.mutedRole.enabled) {
        const embed = new Discord.RichEmbed()
          .setTitle("Cargo de Mute Desativado")
          .setDescription(
            `Ative o cargo de mute usando \`${process.env.PREFIX}role muted on\``
          )
          .setColor(config.color);
        message.channel.send({ embed });
        return;
      }

      if (doc.role.mutedRole.roleID === "Muted") {
        const embed = new Discord.RichEmbed()
          .setTitle("Cargo de Mute Desconfigurado")
          .setDescription(
            `Configure o cargo de mute utilizando \`${process.env.PREFIX}role muted <role mention>\``
          )
          .setColor(config.color);
        message.channel.send({ embed });
        return;
      }

      if (
        doc.channel.punishChannel.channelID ||
        doc.channel.punishChannel.enabled === true
      ) {
        let msg = message;

        let tomute = message.guild.member(
          message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if (!tomute) return message.reply("defina o usuário a ser mutado");
        if (tomute.hasPermission("ADMINISTRATOR"))
          return message.reply("**você não pode mutar staffs.**");
        let reason = args.slice(2).join(" ");
        if (!reason) return message.reply("insira um motivo");

        let muterole = msg.guild.roles.find(`id`, doc.role.mutedRole.roleID);

        let mutetime = args[1];
        if (!mutetime)
          return message.reply("você precisa definir um tempo [1s/1m/1h/1d]");

        mutetime = ms(args[1]);

        const timeConvert = ms(mutetime, { long: true });
        const timeTranslate = timeConvert
          .replace("second", "segundo")
          .replace("minute", "minuto")
          .replace("hour", "hora")
          .replace("day", "dia")
          .replace("seconds", "segundos")
          .replace("minutes", "minutos")
          .replace("hours", "horas")
          .replace("days", "dias");

        const confirm = new Discord.RichEmbed()
          .setTitle("Confirmar Punição")
          .setDescription(
            `**Cheque a punição a ser aplicada:**\n 
            **Usuário:** ${tomute}
            **Tempo:** ${timeTranslate}
            **Motivo:** ${reason}`
          )
          .setColor(config.color)
          .setTimestamp()
          .setFooter(
            `Punido por: ${message.author.username}`,
            message.author.avatarURL
          );
        message.channel.send(confirm).then(async msg => {
          await msg.react(config.sim);
          msg.react(config.nao);
          const filter = (reaction, user) =>
            [config.sim, config.nao].includes(reaction.emoji.id) &&
            user.id === message.author.id;
          const collector = msg.createReactionCollector(filter);
          collector.on("collect", async r => {
            switch (r.emoji.id) {
              case config.sim:
                msg.delete();

                const newMute = new muteDB.Mute({
                  guildID: message.guild.id,
                  userID: tomute.id,
                  muted: {
                    time: Date.now() + mutetime,
                    reason: reason,
                    mutedBy: message.author.username
                  }
                });
                const docMute = await newMute.save();

                msg.reply(
                  `você confirmou a punição de ${tomute} por ${timeTranslate}, cheque o canal <#${doc.channel.punishChannel.channelID}>`
                );

                let muteembed = new Discord.RichEmbed()
                  .setDescription(`**Mute**`)
                  .setColor(config.color)
                  .addField("Usuário", tomute, true)
                  .addField("Staff", message.author.username, true)
                  .setThumbnail(tomute.user.avatarURL, true)
                  .addField("Tempo", timeTranslate, true)
                  .addField("Motivo", reason, true)
                  .setFooter(tomute.user.id)
                  .setTimestamp();
                msg.guild.channels
                  .get(doc.channel.punishChannel.channelID)
                  .send(muteembed);

                await tomute.addRole(doc.role.mutedRole.roleID);

                break;
              case config.nao:
                msg
                  .delete()
                  .then(
                    message.channel.send(`Essa foi por pouco né ${tomute}?`)
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
  name: "mute",
  aliases: ["mutar"],
  category: "Staff"
};
