const Discord = require("discord.js");
const config = require("../../../config.json");

exports.run = async (client, msg, args) => {
  const mention = msg.mentions.members.first();
  const validation = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (!mention)
    return msg.channel.send(
      "Você deve mencionar um usuário para jogar o TicTacToe!"
    );
  if (mention.presence.status === "offline")
    return msg.reply(
      "O usuário mencionado deve estar online para jogar TicTacToe contra você!"
    );
  if (mention.user.bot)
    return msg.channel.send(
      "Você não pode mencionar um bot para jogar o TicTacToe!"
    );
  if (msg.author.id === mention.id)
    return msg.channel.send(
      "Você não pode brincar consigo mesmo. Você precisa mencionar um usuário contra quem deseja jogar."
    );

  let wantToPlayMessage;
  let wantToPlay;
  try {
    const wannaplay = "%mention, você quer jogar TicTacToe contra %author? Se sim, digite '**SIM**' no chat!"
      .replace("%mention", mention)
      .replace("%author", msg.author);
    wantToPlayMessage = await msg.channel.send(wannaplay);
    wantToPlay = await msg.channel.awaitMessages(
      msg2 => msg2.author.id === mention.id,
      {
        max: 1,
        time: 60000,
        errors: ["time"]
      }
    );
  } catch (error) {
    return wantToPlayMessage.delete();
  }

  if (wantToPlay.first().content.toLowerCase() !== "sim") {
    const gamecanceled = "Jogo cancelado porque %mention não respondeu ou não quer jogar!".replace(
      "%mention",
      mention.user.tag
    );
    return msg.reply(gamecanceled);
  }

  await wantToPlayMessage.delete();
  await wantToPlay.first().delete();

  await msg.channel.send(`Novo jogo TicTacToe criado!`);
  let gameEmbed = new Discord.RichEmbed()
    .setTitle("TicTacToe game")
    .setDescription(
      "``` 1 | 2 | 3 \n---|---|--  \n 4 | 5 | 6 \n---|---|--  \n 7 | 8 | 9```"
    )
    .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
    .setColor(config.color);
  const game = await msg.channel.send({
    embed: gameEmbed
  });

  try {
    const yourTurnMessage = await msg.channel.send(
      `${msg.author}, É sua vez ‼`
    );
    const response1 = await msg.channel.awaitMessages(
      msg2 =>
        msg.author.id === msg2.author.id &&
        msg2.content > 0 &&
        msg2.content < 10 &&
        validation[msg2.content - 1] === 0,
      {
        max: 1,
        time: 15000,
        errors: ["time"]
      }
    );

    await yourTurnMessage.delete();
    await response1.first().delete();

    const editedDescription = gameEmbed.description.replace(
      response1.first().content,
      response1.first().author.id === msg.author.id ? "X" : "O"
    );
    gameEmbed = new Discord.RichEmbed()
      .setTitle("TicTacToe game")
      .setDescription(editedDescription)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);

    await game.edit({
      embed: gameEmbed
    });
    validation[response1.first().content - 1] = 1;
  } catch (error) {
    const noanswer = "%author não respondeu por 15 segundos e %user ganhou a rodada."
      .replace("%user", mention)
      .replace("%author", msg.author);
    const noAnswerEmbed = new Discord.RichEmbed()
      .setTitle(
        "%author não respondeu por 15 segundos e %user ganhou a rodada."
      )
      .setDescription(noanswer)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);
    return msg.channel.send({
      embed: noAnswerEmbed
    });
  }

  try {
    const yourTurnMessage = await msg.channel.send(`${mention}, É a sua vez ‼`);
    const response1 = await msg.channel.awaitMessages(
      msg2 =>
        msg2.author.id === mention.id &&
        msg2.content > 0 &&
        msg2.content < 10 &&
        validation[msg2.content - 1] === 0,
      {
        max: 1,
        time: 15000,
        errors: ["time"]
      }
    );

    await yourTurnMessage.delete();
    await response1.first().delete();

    const editedDescription = gameEmbed.description.replace(
      response1.first().content,
      response1.first().author.id === msg.author.id ? "X" : "O"
    );
    gameEmbed = new Discord.RichEmbed()
      .setTitle("TicTacToe game")
      .setDescription(editedDescription)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);

    await game.edit({
      embed: gameEmbed
    });
    validation[response1.first().content - 1] = 2;
  } catch (error) {
    const noanswer = "%author não respondeu por 15 segundos e %user ganhou a rodada."
      .replace("%user", msg.author)
      .replace("%author", mention);
    const noAnswerEmbed = new Discord.RichEmbed()
      .setTitle(
        "%author não respondeu por 15 segundos e %user ganhou a rodada."
      )
      .setDescription(noanswer)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);
    return msg.channel.send({
      embed: noAnswerEmbed
    });
  }

  try {
    const yourTurnMessage = await msg.channel.send(
      `${msg.author}, É a sua vez ‼`
    );
    const response1 = await msg.channel.awaitMessages(
      msg2 =>
        msg.author.id === msg2.author.id &&
        msg2.content > 0 &&
        msg2.content < 10 &&
        validation[msg2.content - 1] === 0,
      {
        max: 1,
        time: 15000,
        errors: ["time"]
      }
    );

    await yourTurnMessage.delete();
    await response1.first().delete();

    const editedDescription = gameEmbed.description.replace(
      response1.first().content,
      response1.first().author.id === msg.author.id ? "X" : "O"
    );
    gameEmbed = new Discord.RichEmbed()
      .setTitle("TicTacToe game")
      .setDescription(editedDescription)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);

    await game.edit({
      embed: gameEmbed
    });
    validation[response1.first().content - 1] = 1;
  } catch (error) {
    const noanswer = "%author não respondeu por 15 segundos e %user ganhou a rodada."
      .replace("%user", mention)
      .replace("%author", msg.author);
    const noAnswerEmbed = new Discord.RichEmbed()
      .setTitle(
        "%author não respondeu por 15 segundos e %user ganhou a rodada."
      )
      .setDescription(noanswer)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);
    return msg.channel.send({
      embed: noAnswerEmbed
    });
  }

  try {
    const yourTurnMessage = await msg.channel.send(`${mention}, É a sua vez ‼`);
    const response1 = await msg.channel.awaitMessages(
      msg2 =>
        msg2.author.id === mention.id &&
        msg2.content > 0 &&
        msg2.content < 10 &&
        validation[msg2.content - 1] === 0,
      {
        max: 1,
        time: 15000,
        errors: ["time"]
      }
    );

    await yourTurnMessage.delete();
    await response1.first().delete();

    const editedDescription = gameEmbed.description.replace(
      response1.first().content,
      response1.first().author.id === msg.author.id ? "X" : "O"
    );
    gameEmbed = new Discord.RichEmbed()
      .setTitle("TicTacToe game")
      .setDescription(editedDescription)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);

    await game.edit({
      embed: gameEmbed
    });
    validation[response1.first().content - 1] = 2;
  } catch (error) {
    const noanswer = "%author não respondeu por 15 segundos e %user ganhou a rodada."
      .replace("%user", msg.author)
      .replace("%author", mention);
    const noAnswerEmbed = new Discord.RichEmbed()
      .setTitle(
        "%author não respondeu por 15 segundos e %user ganhou a rodada."
      )
      .setDescription(noanswer)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);
    return msg.channel.send({
      embed: noAnswerEmbed
    });
  }

  try {
    const yourTurnMessage = await msg.channel.send(
      `${msg.author}, É a sua vez ‼`
    );
    const response1 = await msg.channel.awaitMessages(
      msg2 =>
        msg.author.id === msg2.author.id &&
        msg2.content > 0 &&
        msg2.content < 10 &&
        validation[msg2.content - 1] === 0,
      {
        max: 1,
        time: 15000,
        errors: ["time"]
      }
    );

    await yourTurnMessage.delete();
    await response1.first().delete();

    const editedDescription = gameEmbed.description.replace(
      response1.first().content,
      response1.first().author.id === msg.author.id ? "X" : "O"
    );
    gameEmbed = new Discord.RichEmbed()
      .setTitle("TicTacToe game")
      .setDescription(editedDescription)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);

    await game.edit({
      embed: gameEmbed
    });
    validation[response1.first().content - 1] = 1;
  } catch (error) {
    const noanswer = "%author não respondeu por 15 segundos e %user ganhou a rodada."
      .replace("%user", mention)
      .replace("%author", msg.author);
    const noAnswerEmbed = new Discord.RichEmbed()
      .setTitle(
        "%author não respondeu por 15 segundos e %user ganhou a rodada."
      )
      .setDescription(noanswer)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);
    return msg.channel.send({
      embed: noAnswerEmbed
    });
  }

  try {
    const yourTurnMessage = await msg.channel.send(`${mention}, É a sua vez ‼`);
    const response1 = await msg.channel.awaitMessages(
      msg2 =>
        msg2.author.id === mention.id &&
        msg2.content > 0 &&
        msg2.content < 10 &&
        validation[msg2.content - 1] === 0,
      {
        max: 1,
        time: 15000,
        errors: ["time"]
      }
    );

    await yourTurnMessage.delete();
    await response1.first().delete();

    const editedDescription = gameEmbed.description.replace(
      response1.first().content,
      response1.first().author.id === msg.author.id ? "X" : "O"
    );
    gameEmbed = new Discord.RichEmbed()
      .setTitle("TicTacToe game")
      .setDescription(editedDescription)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);

    await game.edit({
      embed: gameEmbed
    });
    validation[response1.first().content - 1] = 2;
  } catch (error) {
    const noanswer = "%author não respondeu por 15 segundos e %user ganhou a rodada."
      .replace("%user", msg.author)
      .replace("%author", mention);
    const noAnswerEmbed = new Discord.RichEmbed()
      .setTitle(
        "%author não respondeu por 15 segundos e %user ganhou a rodada."
      )
      .setDescription(noanswer)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);
    return msg.channel.send({
      embed: noAnswerEmbed
    });
  }

  const winnerEmbed = new Discord.RichEmbed()
    .setTitle("Game over!")
    .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
    .setColor(config.color);

  if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }

  try {
    const yourTurnMessage = await msg.channel.send(
      `${msg.author}, É a sua vez ‼`
    );
    const response1 = await msg.channel.awaitMessages(
      msg2 =>
        msg.author.id === msg2.author.id &&
        msg2.content > 0 &&
        msg2.content < 10 &&
        validation[msg2.content - 1] === 0,
      {
        max: 1,
        time: 15000,
        errors: ["time"]
      }
    );

    await yourTurnMessage.delete();
    await response1.first().delete();

    const editedDescription = gameEmbed.description.replace(
      response1.first().content,
      response1.first().author.id === msg.author.id ? "X" : "O"
    );
    gameEmbed = new Discord.RichEmbed()
      .setTitle("TicTacToe game")
      .setDescription(editedDescription)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);

    await game.edit({
      embed: gameEmbed
    });
    validation[response1.first().content - 1] = 1;
  } catch (error) {
    const noanswer = "%author não respondeu por 15 segundos e %user ganhou a rodada."
      .replace("%user", mention)
      .replace("%author", msg.author);
    const noAnswerEmbed = new Discord.RichEmbed()
      .setTitle(
        "%author não respondeu por 15 segundos e %user ganhou a rodada."
      )
      .setDescription(noanswer)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);
    return msg.channel.send({
      embed: noAnswerEmbed
    });
  }

  if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }

  try {
    const yourTurnMessage = await msg.channel.send(`${mention}, É a sua vez ‼`);
    const response1 = await msg.channel.awaitMessages(
      msg2 =>
        msg2.author.id === mention.id &&
        msg2.content > 0 &&
        msg2.content < 10 &&
        validation[msg2.content - 1] === 0,
      {
        max: 1,
        time: 15000,
        errors: ["time"]
      }
    );

    await yourTurnMessage.delete();
    await response1.first().delete();

    const editedDescription = gameEmbed.description.replace(
      response1.first().content,
      response1.first().author.id === msg.author.id ? "X" : "O"
    );
    gameEmbed = new Discord.RichEmbed()
      .setTitle("TicTacToe game")
      .setDescription(editedDescription)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);

    await game.edit({
      embed: gameEmbed
    });
    validation[response1.first().content - 1] = 2;
  } catch (error) {
    const noanswer = "%author não respondeu por 15 segundos e %user ganhou a rodada."
      .replace("%user", msg.author)
      .replace("%author", mention);
    const noAnswerEmbed = new Discord.RichEmbed()
      .setTitle(
        "%author não respondeu por 15 segundos e %user ganhou a rodada."
      )
      .setDescription(noanswer)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);
    return msg.channel.send({
      embed: noAnswerEmbed
    });
  }

  if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }

  try {
    const yourTurnMessage = await msg.channel.send(
      `${msg.author}, É a sua vez ‼`
    );
    const response1 = await msg.channel.awaitMessages(
      msg2 =>
        msg.author.id === msg2.author.id &&
        msg2.content > 0 &&
        msg2.content < 10 &&
        validation[msg2.content - 1] === 0,
      {
        max: 1,
        time: 15000,
        errors: ["time"]
      }
    );

    await yourTurnMessage.delete();
    await response1.first().delete();

    const editedDescription = gameEmbed.description.replace(
      response1.first().content,
      response1.first().author.id === msg.author.id ? "X" : "O"
    );
    gameEmbed = new Discord.RichEmbed()
      .setTitle("TicTacToe game")
      .setDescription(editedDescription)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);

    await game.edit({
      embed: gameEmbed
    });
    validation[response1.first().content - 1] = 1;
  } catch (error) {
    const noanswer = "%author não respondeu por 15 segundos e %user ganhou a rodada."
      .replace("%user", mention)
      .replace("%author", msg.author);
    const noAnswerEmbed = new Discord.RichEmbed()
      .setTitle(
        "%author não respondeu por 15 segundos e %user ganhou a rodada."
      )
      .setDescription(noanswer)
      .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
      .setColor(config.color);
    return msg.channel.send({
      embed: noAnswerEmbed
    });
  }

  if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
    const win = "%user ganhou essa rodada!".replace("%user", msg.author);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
    const win = "%user ganhou essa rodada!".replace("%user", mention);
    winnerEmbed.setDescription(win);
    return msg.channel.send({
      embed: winnerEmbed
    });
  }
  const drawEmbed = new Discord.RichEmbed()
    .setTitle("Game over!")
    .setDescription(
      "Ninguém ganhou, é empate! A próxima rodada pode ser melhor."
    )
    .setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
    .setColor(config.color);

  return msg.channel.send({
    embed: drawEmbed
  });
};

exports.help = {
  name: "tictactoe",
  description: "Uma base para futuros comandos",
  usage: "base",
  aliases: ["hashtag", "jogodavelha"],
  category: "Jogos"
};
