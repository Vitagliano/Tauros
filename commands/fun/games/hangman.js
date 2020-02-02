const Discord = require("discord.js");
const config = require("../../../config.json");
const { stripIndents } = require("common-tags");
const words = require("../../../assets/json/words.json");
let serversmap = new Map();

exports.run = async (client, msg, args) => {
  if (serversmap.has(msg.guild.id)) {
    return msg.channel.send(
      new Discord.RichEmbed()
        .setTitle("Erro")
        .setDescription(
          "Já existe uma instância do jogo rodando neste servidor."
        )
        .setColor("RANDOM")
    );
  }

  try {
    const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
    //console.log(`Forca: ${word}`)
    let points = 0;
    let displayText = null;
    let guessed = false;
    const confirmation = [];
    const incorrect = [];
    const display = new Array(word.length).fill("_");
    while (word.length !== confirmation.length && points < 6) {
      await msg.reply(stripIndents`
					${
            displayText === null
              ? "Lá vamos nós!"
              : displayText
              ? "Bom trabalho!"
              : "Nope! :("
          }
					\`${display.join(" ")}\`. Qual letra você escolhe?
					Letras incorretas: ${incorrect.join(", ") || "Nenhuma"}
					\`\`\`
					___________
					|     |
					|     ${points > 0 ? "O" : ""}
					|    ${points > 2 ? "—" : " "}${points > 1 ? "|" : ""}${points > 3 ? "—" : ""}
					|    ${points > 4 ? "/" : ""} ${points > 5 ? "\\" : ""}
					===========
					\`\`\`
				`);
      const filter = res => {
        const choice = res.content.toLowerCase();
        return (
          res.author.id === msg.author.id &&
          !confirmation.includes(choice) &&
          !incorrect.includes(choice)
        );
      };
      const guess = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: 30000
      });
      if (!guess.size) {
        await msg.reply("Ish, o tempo acabou!");
        break;
      }
      const choice = guess.first().content.toLowerCase();
      if (choice === "cancelar") break;
      if (choice.length > 1 && choice === word) {
        guessed = true;
        break;
      } else if (word.includes(choice)) {
        displayText = true;
        for (let i = 0; i < word.length; i++) {
          if (word.charAt(i) !== choice) continue; // eslint-disable-line max-depth
          confirmation.push(word.charAt(i));
          display[i] = word.charAt(i);
        }
      } else {
        displayText = false;
        if (choice.length === 1) incorrect.push(choice);
        points++;
      }
    }

    if (word.length === confirmation.length || guessed)
      return msg.reply(`Você acertou a palavra ${word}!`);
    return msg.reply(`Você perdeu, a palavra era ${word}...`);
  } catch (err) {
    return msg.reply(`Erro: \`${err.message}\``);
  }
};

exports.help = {
  name: "hangman",
  description: "O famoso jogo da forca",
  usage: "hangman",
  aliases: ["forca"],
  category: ["Jogos"]
};
