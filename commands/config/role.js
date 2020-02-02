const Discord = require("discord.js");
const config = require("../../config.json");
const guildsDB = require("../../models/guild");

exports.run = (client, message, args) => {
  let role = message.mentions.roles.first();

  guildsDB.findOne({ guildID: message.guild.id }, function(erro, doc) {
    let adminRole;

    if (doc.role.adminRole === "Administrator") {
      adminRole = `Cargo de Administrador: **${doc.role.adminRole}**`;
    } else {
      adminRole = `Cargo de Administrador: **<@&${doc.role.adminRole}>**`;
    }

    let modRole;

    if (doc.role.modRole === "Moderator") {
      modRole = `Cargo de Moderador: **${doc.role.modRole}**`;
    } else {
      modRole = `Cargo de Moderador: **<@&${doc.role.modRole}>**`;
    }

    let mutedRole;

    if (!doc.role.mutedRole.enabled) mutedRole = `Status cargo de Mute: **Desativado**`;
    else mutedRole = `Status cargo de Mute: **Ativado**`;

    let mutedRoleID;

    if (doc.role.mutedRole.roleID === "Muted") {
      mutedRoleID = `Cargo de Mute: **${doc.role.mutedRole.roleID}**`;
    } else {
      mutedRoleID = `Cargo de Mute: **<@&${doc.role.mutedRole.roleID}>**`;
    }

    const info = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription(
        `Menu de \`configurações\` de \`permissão de administrador e moderador\` do servidor!
          
          ${adminRole}
          ${modRole}
          ${mutedRole}
          ${mutedRoleID}`
      )
      .setFooter(
        `Comando utilizado por: ${message.author.tag}`,
        message.author.avatarURL
      )
      .setTimestamp();

    if (!args[0]) return message.channel.send(info);

    switch (args[0]) {
      case "mod":
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
          return message.channel.send(
            `\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
          );

        if (!modRole) return message.channel.send(info);

        if (role.id === doc.role.modRole) {
          return message.channel.send(
            `\`${message.author.tag}\` a role <@&${doc.role.modRole}> ja está setada como \`Moderador\`.`
          );
        } else {
          doc.role.modRole = role.id;
          doc.save();

          message.channel.send(
            `\`${message.author.tag}\` você setou a role <@&${doc.role.modRole}> para \`Moderador\`.`
          );
          break;
        }

      case "admin":
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
          return message.channel.send(
            `\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
          );

        if (!adminRole) return message.channel.send(info);

        if (role.id === doc.role.adminRole) {
          return message.channel.send(
            `\`${message.author.tag}\` a role <@&${doc.role.adminRole}> ja está setada como \`Administrador\`.`
          );
        } else {
          doc.role.adminRole = role.id;
          doc.save();

          message.channel.send(
            `\`${message.author.tag}\` você setou a role <@&${doc.role.adminRole}> para \`Administrador\`.`
          );
          break;
        }

      case "muted":
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
          return message.channel.send(
            `\`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
          );

        if (args[1] == "on") {
          if (doc.role.mutedRole.enabled === true) {
            return message.channel.send(
              `\`${message.author.tag}\` o status de \`mutado\` ja está ativado!`
            );
          } else {
            doc.role.mutedRole.enabled = true;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do sistema de \`mutado\` do servidor foi alterado para \`on\`.`
              );
            });
            break;
          }
        }
        if (args[1] == "off") {
          if (doc.role.mutedRole.enabled === false) {
            return message.channel.send(
              `\`${message.author.tag}\` o status de \`mutado\` ja está desativado!`
            );
          } else {
            doc.role.mutedRole.enabled = false;
            doc.save().then(async () => {
              await message.channel.send(
                `\`${message.author.tag}\` o status do sistema de \`mutado\` do servidor foi alterado para \`off\`.`
              );
            });
            break;
          }
        }

        if (!mutedRole) return message.channel.send(info);

        if (role.id === doc.role.mutedRole.roleID) {
          return message.channel.send(
            `\`${message.author.tag}\` a role <@&${doc.role.mutedRole.roleID}> ja está setada como \`Mutado\`.`
          );
        } else {
          doc.role.mutedRole.roleID = role.id;
          doc.save();

          message.channel.send(
            `\`${message.author.tag}\` você setou a role <@&${doc.role.mutedRole.roleID}> para \`Mutado\`.`
          );
          break;
        }

      case "help":
        const helpEmbed = new Discord.RichEmbed()
          .setAuthor(
            `Ajuda para configuração de autorole:`,
            client.user.avatarURL
          )
          .setDescription(
            `
            \`${doc.prefix}role admin <role-mention>\` - Define o cargo mencionado como \`Administrador\`.
            \`${doc.prefix}role mod <role-mention>\` - Define o cargo mencionado como \`Moderador\`.`
          )
          .setColor(config.color);

        message.channel.send(helpEmbed);
        break;

      default:
        message.channel.send(
          `\`${message.author.tag}\` configuração \`${args
            .slice(0)
            .join(" ")}\` desconhecida, tente usar: \`mod, admin ou help\`.`
        );
    }
  });
};

exports.help = {
  name: "role",
  description: "Define os cargos de administrador e moderador.",
  usage: "role help",
  aliases: ["roles", "cargo"],
  category: ["Configuração"]
};
