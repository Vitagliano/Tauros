const Discord = require("discord.js");
const config = require("../../config.json");
const guildsDB = require("../../models/guild");

exports.run = async (client, message, args) => {
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
      if (doc.channel.newsChannel.enabled === false) {
        const embed = new Discord.RichEmbed()
          .setTitle("Canal de Avisos Desativado")
          .setDescription(
            `Ative o canal de avisos utilizando \`${process.env.PREFIX}channel news on\``
          )
          .setColor(config.color);
        message.channel.send({ embed });
        return;
      }

      if (doc.channel.newsChannel.channelID === "Nenhum") {
        const embed = new Discord.RichEmbed()
          .setTitle("Canal de Avisos Desconfigurado")
          .setDescription(
            `Configure e ative o canal de avisos utilizando \`${process.env.PREFIX}channel news <channel mention>\``
          )
          .setColor(config.color);
        message.channel.send({ embed });
        return;
      }

      if (
        doc.channel.newsChannel.channelID ||
        doc.channel.newsChannel.enabled === true
      ) {
        let mensg = args.join(" ");
        if (!mensg) {
          message.channel.send(
            `${message.author}, digite uma mensagem para anunciar. :mailbox_with_no_mail:`
          );
          return undefined;
        }

        const confirm = new Discord.RichEmbed()
          .setTitle("Confirmar envio de aviso")
          .setDescription(
            `**Cheque a mensagem a ser enviada:**
          ${mensg}`
          )
          .setColor(config.color)
          .setTimestamp()
          .setFooter(
            `Publicado por: ${message.author.username}`,
            message.author.avatarURL
          );
        message.channel.send(confirm).then(async msg => {
          await msg.react(config.sim);
          msg.react(config.nao);
          const filter = (reaction, user) =>
            [config.nao, config.nao].includes(reaction.emoji.id) &&
            user.id === message.author.id;
          const collector = msg.createReactionCollector(filter);
          collector.on("collect", r => {
            switch (r.emoji.id) {
              case config.sim:
                msg.delete();
                msg.reply(
                  `você confirmou o envio do aviso, cheque o canal <#${doc.channel.newsChannel.channelID}>`
                );
                const embed = new Discord.RichEmbed()
                  .setAuthor(message.guild.name, client.user.avatarURL)
                  .setDescription(`${mensg}`)
                  .setColor(config.color)
                  .setThumbnail(client.user.avatarURL)
                  .setTimestamp()
                  .setFooter(
                    `Publicado por: ${message.author.username}`,
                    message.author.avatarURL
                  );
                client.channels
                  .get(doc.channel.newsChannel.channelID)
                  .send(embed);
                break;
              case config.nao:
                msg
                  .delete()
                  .then(message.reply(`você cancelou o envio do aviso!`));
                break;
            }
          });
        });
      }
    }
  });
};

exports.help = {
  name: "warn",
  aliases: ["aviso", "anuncio", "anunciar"],
  category: ["Staff"]
};
