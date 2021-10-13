module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === 'dm') return;

  const prefix = process.env.PREFIX;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;

  const commandInfo =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  if (commandInfo) {
    commandInfo.run(client, message, args);
  }
};
