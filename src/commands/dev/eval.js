module.exports = {
  config: {
    name: 'eval',
    aliases: []
  },
  run: async (client, message, args) => {
    if (message.author.id != '557216693676408832')
      return message.reply('❌ Você não tem permissão para usar esse comando.');

    let code = args.join(' ');

    if (!code)
      return message.reply('Especifique o codigo que você deseja executar.');

    try {
      let evaled = await eval(code);

      if (typeof evaled !== 'string') {
        evaled = require('util').inspect(evaled, {
          depth: 0
        });
      }

      message.reply(`**📥 Resultado:**\n \`\`\`js\n${evaled}\`\`\``);
    } catch (err) {
      message.reply(`**📤 Erro:**\n \`\`\`js\n${err}\`\`\``);
    }
  }
};
