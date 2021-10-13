const { readdirSync } = require('fs');

module.exports = (client) => {
  const load = (dirs) => {
    const events = readdirSync(`./src/events/${dirs}/`).filter((f) =>
      f.endsWith('.js')
    );

    for (let file of events) {
      const event = require(`../events/${dirs}/${file}`);
      let eventName = file.split('.')[0];

      client.on(eventName, event.bind(null, client));
    }
  };
  readdirSync(`./src/events/`).forEach((x) => load(x));
};
