const Discord = require("discord.js"); //definindo conexão com discord padrão
const fs = require("fs"); //Definindo constante fs para inicialização de eventos
const client = new Discord.Client(); //definindo o bot como um novo client
const c = require("colors");
const fileUtils = require("./utils/fileUtils");

require("./utils/functions")(client);

client.config = require("./config");

client.mongoose = require("./utils/mongoose");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

/**
 * Initialize and start the bot.
 */
function start() {
  console.log(c.cyan("Carregando eventos..."));
  loadEvents("./events");

  console.log(c.cyan("Carregando comandos..."));
  loadCommands("./commands");

  console.log(c.cyan("Conectando o bot..."));
  client.login(process.env.CLIENT_TOKEN);
  client.mongoose.init();
}

/**
 * Load all commands in a specific directory.
 *
 * @param {string} dir - The commands directory.
 */
function loadCommands(dir) {
  for (const dirInfo of fileUtils.searchByExtension(dir, "js")) {
    const dirList = dirInfo.directory.split("/");
    dirList.shift();
    dirList.shift();
    const commandCategory = dirList.join("/");

    for (const file of dirInfo.files) {
      let cmd = require(file);
      if (!cmd.help) {
        // Invalid command.
        continue;
      }

      client.commands.set(cmd.help.name, cmd);
      if (cmd.help.aliases) {
        cmd.help.aliases
          .filter(alias => alias.trim() !== "")
          .forEach(alias => client.aliases.set(alias, cmd.help.name));
      }
    }

    const formatedFiles = dirInfo.files.map(file =>
      file
        .split("/")
        .pop()
        .split(".")
        .shift()
    );
    console.log(
      `[COMANDO] ` +
        c.yellow("Foram carregados ") +
        dirInfo.files.length +
        c.yellow(" comandos na categoria ") +
        commandCategory +
        c.yellow(". [") +
        formatedFiles.join(c.yellow(", ")) +
        c.yellow("]")
    );
  }
}

/**
 * Load all events in a specific directory.
 *
 * @param {string} dir - The events directory.
 */
function loadEvents(dir) {
  for (const dirInfo of fileUtils.searchByExtension(dir, "js")) {
    for (const file of dirInfo.files) {
      let events = require(file);
      if (!Array.isArray(events)) {
        events = [events];
      }

      for (const event of events) {
        if (!event.name || !event.run) {
          continue;
        }

        console.log(
          `[EVENTO] ` +
            c.yellow("O evento ") +
            event.name +
            c.yellow(" foi carregado!")
        );

        client.on(event.name, (...args) => event.run(client, ...args));
      }
    }
  }
}

start();
