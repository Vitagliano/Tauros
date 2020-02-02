const Discord = require("discord.js");
const config = require("../../config.json");
const guildsDB = require("../../models/guild");

exports.run = (client, message, args) => {
  let channel = message.mentions.channels.first();

  guildsDB.findOne({ guildID: message.guild.id }, function(erro, doc) {
    let punishChannel;

    if (!doc.channel.punishChannel.enabled) punishChannel = `Status do canal de \`Punição\`: **Desativado**`;
    else punishChannel = `Status do canal de \`Punição\`: **Ativado**`;

    let punishChannelID;

    if (doc.channel.punishChannel.channelID === "Nenhum") {
      punishChannelID = `Canal de \`Punição\`: **${doc.channel.punishChannel.channelID}**`;
    } else {
      punishChannelID = `Canal de \`Punição\`: **<#${doc.channel.punishChannel.channelID}>**`;
    }

    let logsChannel;

    if (!doc.channel.logsChannel.enabled) logsChannel = `Status do canal de \`Logs\`: **Desativado**`;
    else logsChannel = `Status do canal de \`Logs\`: **Ativado**`;

    let logsChannelID;

    if (doc.channel.logsChannel.channelID === "Nenhum") {
      logsChannelID = `Canal de \`Logs\`: **${doc.channel.logsChannel.channelID}**`;
    } else {
      logsChannelID = `Canal de \`Logs\`: **<#${doc.channel.logsChannel.channelID}>**`;
    }

    let newsChannel;

    if (!doc.channel.newsChannel.enabled) newsChannel = `Status do canal de \`Avisos\`: **Desativado**`;
    else newsChannel = `Status do canal de \`Avisos\`: **Ativado**`;

    let newsChannelID;

    if (doc.channel.newsChannel.channelID === "Nenhum") {
      newsChannelID = `Canal de \`Avisos\`: **${doc.channel.newsChannel.channelID}**`;
    } else {
      newsChannelID = `Canal de \`Avisos\`: **<#${doc.channel.newsChannel.channelID}>**`;
    }

    let commandChannel;

    if (!doc.channel.commandChannel.enabled) commandChannel = `Status do canal de \`Comandos\`: **Desativado**`;
    else commandChannel = `Status do canal de \`Comandos\`: **Ativado**`;

    let commandChannelID;

    if (doc.channel.commandChannel.channelID === "Nenhum") {
      commandChannelID = `Canal de \`Comandos\`: **${doc.channel.commandChannel.channelID}**`;
    } else {
      commandChannelID = `Canal de \`Comandos\`: **<#${doc.channel.commandChannel.channelID}>**`;
    }

    const info = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(
        `Menu de \`configurações\` de \`canais\` do servidor!
          
          ${punishChannel}
          ${punishChannelID}
          ${logsChannel}
          ${logsChannelID}
          ${newsChannel}
          ${newsChannelID}
          ${commandChannel}
          ${commandChannelID}`
      )
      .setFooter(
        `Comando utilizado por: ${message.author.tag}`,
        message.author.avatarURL
      )
      .setTimestamp();

    if (!args[0]) return message.channel.send(info);

    switch (args[0]) {
      case "punish":
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
          return message.channel.send(
            `\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
          );

        if (args[1] == "on") {
          if (doc.channel.punishChannel.enabled === true) {
            return message.channel.send(
              `\`${message.author.tag}\` o status do canal de \`Punição\` ja está ativado!`
            );
          } else {
            doc.channel.punishChannel.enabled = true;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do canal de \`Punição\` do servidor foi alterado para \`on\`.`
              );
            });
            break;
          }
        }
        if (args[1] == "off") {
          if (doc.channel.punishChannel.enabled === false) {
            return message.channel.send(
              `\`${message.author.tag}\` o status do canal de \`Punição\` ja está desativado!`
            );
          } else {
            doc.channel.punishChannel.enabled = false;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do canal de \`Punição\` do servidor foi alterado para \`off\`.`
              );
            });
            break;
          }
        }

        if (!punishChannel) return message.channel.send(info);

        if (channel.id === doc.channel.punishChannel.channelID) {
          return message.channel.send(
            `\`${message.author.tag}\` o canal <#${doc.channel.punishChannel.channelID}> ja está setado como \`Punições\`.`
          );
        } else {
          doc.channel.punishChannel.channelID = channel.id;
          doc.save();

          message.channel.send(
            `\`${message.author.tag}\` você setou o canal <#${doc.channel.punishChannel.channelID}> para \`Punições\`.`
          );
          break;
        }

      case "logs":
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
          return message.channel.send(
            `\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
          );

        if (args[1] == "on") {
          if (doc.channel.logsChannel.enabled === true) {
            return message.channel.send(
              `\`${message.author.tag}\` o status do canal de \`Logs\` ja está ativado!`
            );
          } else {
            doc.channel.logsChannel.enabled = true;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do canal de \`Logs\` do servidor foi alterado para \`on\`.`
              );
            });
            break;
          }
        }
        if (args[1] == "off") {
          if (doc.channel.logsChannel.enabled === false) {
            return message.channel.send(
              `\`${message.author.tag}\` o status do canal de \`Logs\` ja está desativado!`
            );
          } else {
            doc.channel.logsChannel.enabled = false;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do canal de \`Logs\` do servidor foi alterado para \`off\`.`
              );
            });
            break;
          }
        }

        if (!logsChannel) return message.channel.send(info);

        if (channel.id === doc.channel.logsChannel.channelID) {
          return message.channel.send(
            `\`${message.author.tag}\` o canal <#${doc.channel.logsChannel.channelID}> ja está setado como \`Logs\`.`
          );
        } else {
          doc.channel.logsChannel.channelID = channel.id;
          doc.save();

          message.channel.send(
            `\`${message.author.tag}\` você setou o canal <#${doc.channel.logsChannel.channelID}> para \`Logs\`.`
          );
          break;
        }

      case "news":
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
          return message.channel.send(
            `\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
          );

        if (args[1] == "on") {
          if (doc.channel.newsChannel.enabled === true) {
            return message.channel.send(
              `\`${message.author.tag}\` o status do canal de \`Avisos\` ja está ativado!`
            );
          } else {
            doc.channel.newsChannel.enabled = true;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do canal de \`Avisos\` do servidor foi alterado para \`on\`.`
              );
            });
            break;
          }
        }
        if (args[1] == "off") {
          if (doc.channel.newsChannel.enabled === false) {
            return message.channel.send(
              `\`${message.author.tag}\` o status do canal de \`Avisos\` ja está desativado!`
            );
          } else {
            doc.channel.newsChannel.enabled = false;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do canal de \`Avisos\` do servidor foi alterado para \`off\`.`
              );
            });
            break;
          }
        }

        if (!newsChannel) return message.channel.send(info);

        if (channel.id === doc.channel.newsChannel.channelID) {
          return message.channel.send(
            `\`${message.author.tag}\` o canal <#${doc.channel.newsChannel.channelID}> ja está setado como \`Avisos\`.`
          );
        } else {
          doc.channel.newsChannel.channelID = channel.id;
          doc.save();

          message.channel.send(
            `\`${message.author.tag}\` você setou o canal <#${doc.channel.newsChannel.channelID}> para \`Avisos\`.`
          );
          break;
        }

      case "command":
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
          return message.channel.send(
            `\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
          );

        if (args[1] == "on") {
          if (doc.channel.commandChannel.enabled === true) {
            return message.channel.send(
              `\`${message.author.tag}\` o status do canal de \`Avisos\` ja está ativado!`
            );
          } else {
            doc.channel.commandChannel.enabled = true;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do canal de \`Avisos\` do servidor foi alterado para \`on\`.`
              );
            });
            break;
          }
        }
        if (args[1] == "off") {
          if (doc.channel.commandChannel.enabled === false) {
            return message.channel.send(
              `\`${message.author.tag}\` o status do canal de \`Comandos\` ja está desativado!`
            );
          } else {
            doc.channel.commandChannel.enabled = false;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do canal de \`Comandos\` do servidor foi alterado para \`off\`.`
              );
            });
            break;
          }
        }

        if (!commandChannel) return message.channel.send(info);

        if (channel.id === doc.channel.commandChannel.channelID) {
          return message.channel.send(
            `\`${message.author.tag}\` o canal <#${doc.channel.commandChannel.channelID}> ja está setado como \`Comandos\`.`
          );
        } else {
          doc.channel.commandChannel.channelID = channel.id;
          doc.save();

          message.channel.send(
            `\`${message.author.tag}\` você setou o canal <#${doc.channel.commandChannel.channelID}> para \`Comandos\`.`
          );
          break;
        }

      case "help":
        const helpEmbed = new Discord.RichEmbed()
          .setAuthor(
            `Ajuda para configuração de canais:`,
            client.user.avatarURL
          )
          .setDescription(
            `
            \`${doc.prefix}channel punish on/off\` - Ativa e desativa o canal de \`Punições\`.
            \`${doc.prefix}channel punish <channel mention>\` - Define o canal de \`Punições\`.`
          )
          .setColor(config.color);

        message.channel.send(helpEmbed);
        break;

      default:
        message.channel.send(
          `\`${message.author.tag}\` configuração \`${args
            .slice(0)
            .join(
              " "
            )}\` desconhecida, tente usar: \`channel, on, off ou help\`.`
        );
    }
  });
};

exports.help = {
  name: "channel",
  description: "Define os canais de punição, avisos, logs e comandos.",
  usage: "channel help",
  aliases: ["channels", "canal"],
  category: ["Configuração"]
};
