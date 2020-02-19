const Discord = require("discord.js");
const config = require("../../config.json");
const guildsDB = require("../../models/guild");

exports.run = (client, message, args) => {
  let role = message.mentions.roles.first();

  guildsDB.findOne({ guildID: message.guild.id }, function(erro, doc) {
    let autorole;

    if (!doc.autorole.enabled) autorole = `Status: **Desativado**`;
    else autorole = `Status: **Ativado**`;

    let autoroleid;

    if (doc.autorole.roleID === "Membro") {
      autoroleid = `Cargo de autorole: **${doc.autorole.roleID}**`;
    } else {
      autoroleid = `Cargo de autorole: **<@&${doc.autorole.roleID}>**`;
    }

    const info = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(
        `Menu de \`configurações\` de \`autorole\` do servidor!
          
          ${autorole}
          ${autoroleid}`
      )
      .setFooter(
        `Comando utilizado por: ${message.author.tag}`,
        message.author.avatarURL
      )
      .setTimestamp();

    if (!args[0]) return message.channel.send(info);

    switch (args[0]) {
      case "role":
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
          return message.channel.send(
            `\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
          );

        if (!role) return message.channel.send(info);

        if (role.id === doc.autorole.roleID) {
          return message.channel.send(
            `\`${message.author.tag}\` a role <@&${doc.autorole.roleID}> ja está setada no \`autorole\`.`
          );
        } else {
          doc.autorole.roleID = role.id;
          doc.save();

          message.channel.send(
            `\`${message.author.tag}\` você setou o \`autorole\` para a role <@&${doc.autorole.roleID}>.`
          );
          break;
        }

      case "remover":
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
          return message.channel.send(
            `\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
          );

        if (!doc.autorole.enabled) {
          return message.channel.send(
            `\`${message.author.tag}\` o \`autorole\` não está habilitado para você \`remove-lo\` do servidor!`
          );
        } else {
          doc.autorole.roleID = "Membro";
          doc.save();

          message.channel.send(
            `\`${message.author.tag}\` você removeu o \`autorole\` do servidor!`
          );
          break;
        }

      case "on":
        if (doc.autorole.enabled === true) {
          return message.channel.send(
            `\`${message.author.tag}\` o status de \`autorole\` ja está ativado!`
          );
        } else {
          doc.autorole.enabled = true;
          doc.save().then(async () => {
            await message.channel.send(
              `\`${message.author.tag}\` o status do sistema de \`autorole\` do servidor foi alterado para \`on\`.`
            );
          });
          break;
        }

      case "off":
        if (doc.autorole.enabled === false) {
          return message.channel.send(
            `\`${message.author.tag}\` o status de \`autorole\` ja está desativado!`
          );
        } else {
          doc.autorole.enabled = false;
          doc.save().then(async () => {
            await message.channel.send(
              `\`${message.author.tag}\` o status do sistema de \`autorole\` do servidor foi alterado para \`off\`.`
            );
          });
          break;
        }

      case "help":
        const helpEmbed = new Discord.RichEmbed()
          .setAuthor(`Ajuda para configuração de autorole:`, client.user.avatarURL)
          .setDescription(
            `
                       \`${doc.prefix}autorole role <role-mention>\` - O cargo mencionado será setado como cargo principal, ou seja todos os novos membros receberam ele.
                       \`${doc.prefix}autorole remover\` - Remove o cargo atual do autorole, ou seja todos os membros novos não receberam mais nenhum cargo.
                       \`${doc.prefix}autorole on\` - Ativará o status do autorole, ou seja com isto o comando irá setar o cargo nos membros.
                       \`${doc.prefix}autorole off\` - Desativará o status do autorole, ou seja com isto o comando não irá mais setar o cargo nos membros.`
          )
          .setColor("RANDOM");

        message.channel.send(helpEmbed);
        break;

      default:
        message.channel.send(
          `\`${message.author.tag}\` configuração \`${args
            .slice(0)
            .join(
              " "
            )}\` desconhecida, tente usar: \`role, remover, on, off ou help\`.`
        );
    }
  });
};

exports.help = {
  name: "autorole",
  usage: "autorole help",
  description: "Define um cargo de entrada automático",
  category: "Configuração"
};
