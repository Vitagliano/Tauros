const Discord = require("discord.js");
const config = require("../config.json");
require("dotenv-flow").config();

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

  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content
    .slice(settings.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args, settings);
}

function getCommand(client, name) {
  name = name.slice(process.env.PREFIX.length);

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
