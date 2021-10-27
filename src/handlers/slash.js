const { readdirSync } = require('fs');

module.exports = client => {
  const load = dirs => {
    const commands = readdirSync(`./src/slash/${dirs}/`).filter(f =>
      f.endsWith('.js')
    );

    for (const file of commands) {
      const command = require(`../slash/${dirs}/${file}`);
      client.slash.set(command.config.name, command);
    }
  };

  readdirSync('./src/slash/').forEach(x => load(x));
};
