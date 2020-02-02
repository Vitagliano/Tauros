const Discord = require("discord.js");
const config = require("../../config.json");
const guildsDB = require("../../models/guild");

exports.run = async (client, message, args, settings) => {
  const name = client.commands.get("leave").help.name;
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    embed = new Discord.RichEmbed()
      .setTitle("Sem Permissão")
      .setDescription("Você não tem permissão para executar esse comando.")
      .setColor(config.color)
      .setThumbnail("https://i.imgur.com/s7nhucA.png");
    message.channel.send({ embed });
  } else {
    var mention = message.mentions.channels.first();

    guildsDB.findOne({ guildID: message.guild.id }, function(erro, doc) {
      let leave;

      if (doc.leave.enabled === false)
        leave = "O sistema de saida esta desativado.";
      else leave = "O sistema de saida esta ativado.";

      let leavechannel;

      if (doc.leave.channel === "bem-vindo") {
        leavechannel = `Canal de **saida**: (${doc.leave.channel})`;
      } else {
        leavechannel = `Canal de **saida**: (${doc.leave.channel})`;
      }

      let leavemsg;

      if (doc.leave.message === "Bem-vindo {{user}} à {{guild}}!") {
        leavemsg = `Mensagem de **saida**: **(${doc.leave.message})**`;
      } else {
        leavemsg = `Mensagem de **saida**: **(${doc.leave.message})**`;
      }

      const info = new Discord.RichEmbed()
        .setAuthor('Configuração "saida"')
        .setDescription(
          `Menu de \`configurações\` de \`saida\` do servidor!
          
          ${leave}
          ${leavechannel}
          ${leavemsg}`
        )
        .setThumbnail("https://i.imgur.com/ABGT2yp.png")
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp();

      if (!args[0]) return message.channel.send(info);

      switch (args[0]) {
        case "channel":
          if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
            return message.channel.send(
              ` \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
            );

          if (!mention) return message.channel.send(info);

          if (mention.id === doc.leave.channel) {
            return message.channel.send(
              ` \`${message.author.tag}\` o canal \`informado\` ja está definido como \`leave\`.`
            );
          } else {
            doc.leave.channel = mention.id;
            doc.save();

            message.channel.send(
              ` \`${message.author.tag}\` você definiu o canal ${mention} como \`leave\`.`
            );
            break;
          }

        case "msg":
          if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
            return message.channel.send(
              ` \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
            );

          if (doc.leavechannel === "bem-vindo") {
            return message.channel.send(
              ` \`${message.author.tag}\` nenhum canal foi setado para \`leave\` para você adicionar a \`mensagem\`.`
            );
          } else {
            doc.leave.message = args.slice(1).join(" ");
            doc.save();

            message.channel.send(
              ` \`${message.author.tag}\` você definiu a mensagem do canal <#${
                doc.leave.channel
              }> para: ${args.slice(1).join(" ")}`
            );
            break;
          }

        case "remove":
          if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
            return message.channel.send(
              ` \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
            );

          if (!doc.leave) {
            message.channel.send(
              ` \`${message.author.tag}\` não existe nenhum \`canal\` setado para o \`leave\`.`
            );
          } else {
            doc.leave.enabled = false;
            doc.leavechannel = "bem-vindo";
            doc.leavemsg = "Bem-vindo {{user}} à {{guild}}!";
            doc.save();

            message.channel.send(
              ` \`${message.author.tag}\` você removeu o \`canal\` atual do \`leave\``
            );
            break;
          }

        case "on":
          if (doc.leave.enabled === true) {
            return message.channel.send(
              ` \`${message.author.tag}\` o status de \`saida\` ja está ativado!`
            );
          } else {
            doc.leave.enabled = true;
            doc.save().then(async () => {
              await message.channel.send(
                ` \`${message.author.tag}\` o status do sistema de \`saida\` do servidor foi alterado para \`on\`.`
              );
            });
            break;
          }

        case "off":
          if (doc.leave.enabled === false) {
            return message.channel.send(
              ` \`${message.author.tag}\` o status de \`saida\` ja está desativado!`
            );
          } else {
            doc.leave.enabled = false;
            doc.save().then(async () => {
              await message.channel.send(
                ` \`${message.author.tag}\` o status do sistema de \`saida\` do servidor foi alterado para \`off\`.`
              );
            });
            break;
          }

        case "help":
          if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
            return message.channel.send(
              ` \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
            );

          const embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(
              `
                  **- FORMAS DE USAR -**
                  
                  \`${doc.prefix}leave canal <canal-mention>\` - O canal mencionado será setado como o canal aonde todas as mensagens de saida serão envidas.
                  \`${doc.prefix}leave msg <mensagem>\` - A mensagem que será enviada após o usuário sair do servidor.
                  \`${doc.prefix}leave remover\` - Remove o canal atual aonde as mensagens são enviadas, a mensagem e também desativa o sistema de saida.
                  \`${doc.prefix}leave on\` - Ativa o sistema de saida do servidor, ou seja apartir dai a mensagem será enviada.
                  \`${doc.prefix}leave off\` - Desativa o sistema de saida do servidor, ou seja apartir dai a mensagem não será mais enviada.
                  **- PLACEHOLDERS -**
{usuario.id} - Pega a \`id\` do usuário. Exemplo: \`${message.author.id}\`
{usuario.nome} - Pega o \`nome\` do usuário. Exemplo: \`${message.author.username}\`
{usuario.tagnome} - Pega a \`tag/nome\` do usuário. Exemplo: \`${message.author.tag}\`
{usuario.tag} - Pega a \`tag\` do usuário. Exemplo: \`${message.author.discriminator}\`
{servidor} - Pega o \`nome\` do servidor. Exemplo: \`${message.guild.name}\`
{usuarios} - Pega o \`total\` de usuários no servidor. Exemplo: \`${message.guild.memberCount}\``
            )
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTimestamp();

          message.channel.send(embed);
          break;

        default:
          message.channel.send(
            ` \`${message.author.tag}\` configuração \`${args
              .slice(0)
              .join(
                " "
              )}\` desconhecida, tente usar: \`canal, remove, msg, on, off ou help\`.`
          );
      }
    });
  }
};

exports.help = {
  name: "leave",
  description: "Define o canal e a mensagem de saida",
  usage: "leave help",
  category: ["Configuração"]
};
