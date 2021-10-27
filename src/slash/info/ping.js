module.exports = {
  config: {
    name: 'ping',
    description: 'Mostra o ping do bot'
  },
  run: async (client, interaction) => {
    await interaction.reply({
      content: `:ping_pong:  ${Math.round(client.ws.ping)}ms`
    });
  }
};
