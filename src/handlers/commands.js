const { readdirSync } = require('fs');

module.exports = client => {
  const load = dirs => {
    const commands = readdirSync(`./src/commands/${dirs}/`).filter(f =>
      f.endsWith('.js')
    );

    for (const file of commands) {
      const command = require(`../commands/${dirs}/${file}`);
      client.commands.set(command.config.name, command);

      if (command.config.aliases)
        command.config.aliases.forEach(a =>
          client.aliases.set(a, command.config.name)
        );
    }
  };
  readdirSync('./src/commands/').forEach(x => load(x));
};
