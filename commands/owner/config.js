exports.run = async (client, message, args, settings, guild) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply("você não tem perm bobão");

  let setting = args[0];
  let updated = args.slice(1).join(" ");

  switch (setting) {
    case "prefix": {
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
      break;
    }
    case "resetPrefix": {
      try {
        await client.updateGuild(message.guild, { prefix: "!" });
        return message.channel.send("O prefix foi atualizado para: `!`");
      } catch (error) {
        console.error(error);
        message.channel.send(`Um erro aconteceu: **${error.message}**`);
      }
      message.channel.send("O prefix foi resetado para o padrão: `!`");
    }
    case "welcomeChannel": {
      /**
       * Channel validation. Check if the mentioned channel is a guild.
       * Want a hint?
       * ```js
       * let channel = message.mentions.channels.find(c => c.name === updated);
       *
       * // example of Collection#find (look below)
       * collection.find(val => val.username === 'Anthony');
       * ```
       * Remember when I talked about collections earlier in the video!
       * https://discord.js.org/#/docs/main/stable/class/Collection?scrollTo=find
       * https://anidiots.guide/understanding/collections
       */

      break;
    }
    case "welcomeMsg": {

    }
    case "modRole": {
      /**
       * Make sure to do role validation? Need help? Refer to the "welcomeChannel" case statement above!
       */

      break;
    }
    case "adminRole": {
      /**
       * Make sure to do role validation? Need help? Refer to the "welcomeChannel" case statement above!
       */

      break;
    }
    default: {
      /**
       * Want to go further? Use object destructuring to get the different properties from the MongoDB document
       * and display them in the message below!
       *
       * Object desctructuring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
       */

      message.channel.send(`Configuração padrão: PLACEHOLDER`);
      break;
    }
  }
};

exports.help = {
  name: "config"
};
