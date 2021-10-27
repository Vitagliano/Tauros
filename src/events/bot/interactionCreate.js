module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.guild) return;

  const cmd = interaction.commandName;

  const command = client.slash.get(cmd.toLowerCase());

  if (command) {
    command.run(client, interaction);
  }
};
