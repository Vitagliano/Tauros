const Discord = require("discord.js");
const config = require("../config");

const cooldown = new Map();
const queue = new Map();

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 */
async function onMessage(client, message) {
  if (message.author.bot || message.channel.type !== "text") {
    return;
  }

  if (!message.guild) return;

  let settings;
  try {
    settings = await client.getGuild(message.guild);
  } catch (error) {
    console.error(error);
  }

  if (message.isMentioned(client.user)) {
    message.reply(
      `o meu prefixo neste servidor é \`${settings.prefix}\`, para ver o que eu posso fazer use \`${settings.prefix}ajuda\`!`
    );
  }

  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content.split(" ");
  const cmd = args.shift();

  const command = getCommand(client, cmd);
  if (command) {
    // message.delete(1000).catch(err => {});

    // if (cooldown.has(message.author.id)) {
    //   const timeSinceLastCommand = Date.now() - cooldown.get(message.author.id);
    //   if (timeSinceLastCommand < config.command.cooldown) {
    //     message
    //       .reply(
    //         `Aguarde ${(
    //           (config.command.cooldown - timeSinceLastCommand) /
    //           1000
    //         ).toFixed(2)} segundos para executar um novo comando.`
    //       )
    //       .then(msg => msg.delete(5000));
    //     return;
    //   }
    // }

    // if (
    //   !message.member.roles.find(
    //     role =>
    //       role.id === config.ranks.lider ||
    //       role.id === config.ranks.sublider ||
    //       role.id === config.ranks.dono
    //   )
    // ) {
    //   cooldown.set(message.author.id, Date.now());
    // }

    command.run(client, message, args, settings, queue);
  }
}

function getCommand(client, name) {
  name = name.slice(config.prefix.length);

  let command = client.commands.get(name);
  if (!command) {
    command = client.commands.get(client.aliases.get(name));
  }

  return command;
}

module.exports = {
  name: "message",
  run: onMessage
};
