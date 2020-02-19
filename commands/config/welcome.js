const Discord = require("discord.js");
const config = require("../../config.json");
const guildsDB = require("../../models/guild");

exports.run = async (client, message, args, settings) => {
  const name = client.commands.get("welcome").help.name;
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
      let welcome;

      if (doc.welcome.enabled === false)
        welcome = "O sistema de boas-vindas esta desativado.";
      else welcome = "O sistema de boas-vindas esta ativado.";

      let welcomechannel;

      if (doc.welcome.channel === "bem-vindo") {
        welcomechannel = `Canal de **boas-vindas**:\n ${doc.welcome.channel}`;
      } else {
        welcomechannel = `Canal de **boas-vindas**:\n ${doc.welcome.channel}`;
      }

      let welcomemsg;

      if (doc.welcome.message === "Bem-vindo {{user}} à {{guild}}!") {
        welcomemsg = `Mensagem de **boas-vindas**:\n ${doc.welcome.message}`;
      } else {
        welcomemsg = `Mensagem de **boas-vindas**:\n ${doc.welcome.message}`;
      }

      const info = new Discord.RichEmbed()
        .setAuthor('Configuração "boas-vindas"')
        .setDescription(
          `Menu de \`configurações\` de \`entrada\` do servidor!
          
          ${welcome}
          ${welcomechannel}
          ${welcomemsg}`
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

          if (mention.id === doc.welcome.channel) {
            return message.channel.send(
              ` \`${message.author.tag}\` o canal \`informado\` ja está definido como \`welcome\`.`
            );
          } else {
            doc.welcome.channel = mention.id;
            doc.save();

            message.channel.send(
              ` \`${message.author.tag}\` você definiu o canal ${mention} como \`welcome\`.`
            );
            break;
          }

        case "msg":
          if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
            return message.channel.send(
              ` \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
            );

          if (doc.welcomechannel === "bem-vindo") {
            return message.channel.send(
              ` \`${message.author.tag}\` nenhum canal foi setado para \`welcome\` para você adicionar a \`mensagem\`.`
            );
          } else {
            doc.welcome.message = args.slice(1).join(" ");
            doc.save();

            message.channel.send(
              ` \`${message.author.tag}\` você definiu a mensagem do canal <#${
                doc.welcome.channel
              }> para: ${args.slice(1).join(" ")}`
            );
            break;
          }

        case "remove":
          if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES"))
            return message.channel.send(
              ` \`${message.author.tag}\` Você não tem permissão para usar este comando! Para utilizá-lo, você precisa ter a permissão \`ADMINISTRADOR\`.`
            );

          if (!doc.welcome) {
            message.channel.send(
              ` \`${message.author.tag}\` não existe nenhum \`canal\` setado para o \`welcome\`.`
            );
          } else {
            doc.welcome.enabled = false;
            doc.welcomechannel = "bem-vindo";
            doc.welcomemsg = "Bem-vindo {{user}} à {{guild}}!";
            doc.save();

            message.channel.send(
              ` \`${message.author.tag}\` você removeu o \`canal\` atual do \`welcome\``
            );
            break;
          }

        case "on":
          if (doc.welcome.enabled === true) {
            return message.channel.send(
              ` \`${message.author.tag}\` o status de \`entrada\` ja está ativado!`
            );
          } else {
            doc.welcome.enabled = true;
            doc.save().then(async () => {
              await message.channel.send(
                ` \`${message.author.tag}\` o status do sistema de \`entrada\` do servidor foi alterado para \`on\`.`
              );
            });
            break;
          }

        case "off":
          if (doc.welcome.enabled === false) {
            return message.channel.send(
              ` \`${message.author.tag}\` o status de \`entrada\` ja está desativado!`
            );
          } else {
            doc.welcome.enabled = false;
            doc.save().then(async () => {
              await message.channel.send(
                ` \`${message.author.tag}\` o status do sistema de \`entrada\` do servidor foi alterado para \`off\`.`
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
                  
                  \`${doc.prefix}welcome canal <canal-mention>\` - O canal mencionado será setado como o canal aonde todas as mensagens de entrada serão envidas.
                  \`${doc.prefix}welcome msg <mensagem>\` - A mensagem que será enviada após o usuário sair do servidor.
                  \`${doc.prefix}welcome remover\` - Remove o canal atual aonde as mensagens são enviadas, a mensagem e também desativa o sistema de entrada.
                  \`${doc.prefix}welcome on\` - Ativa o sistema de entrada do servidor, ou seja apartir dai a mensagem será enviada.
                  \`${doc.prefix}welcome off\` - Desativa o sistema de entrada do servidor, ou seja apartir dai a mensagem não será mais enviada.
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
  name: "welcome",
  description: "Define o canal e a mensagem de boas-vindas",
  usage: "welcome help",
  category: "Configuração"
};
