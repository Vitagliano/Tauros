const Discord = require("discord.js");
const mergeImg = require("merge-img");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  //let user1 = message.guild.member(message.mentions.users.firstKey());
  //let user2 = message.guild.member(message.mentions.users.lastKey());
  let user1 = message.mentions.members.first();
  let user2 = message.mentions.members.last();
  if (!user1)
    return message.channel.send(
      "Você não mencionou a primeira pessoa para shippar"
    );
  if (!user2)
    return message.channel.send(
      "Você não mencionou a segunda pessoa para shippar"
    );

  let shipname = "";
  let guardaone = user1.user.username.length;
  let guardatwo = user2.user.username.length;

  shipname += String(user1.user.username).substring(
    0,
    Math.floor(guardaone / 2)
  );
  shipname += String(user2.user.username).substring(
    Math.floor(guardatwo / 2),
    guardatwo
  );

  let ship = Math.floor(Math.random() * 100) + 1;

  let titleMatch, descriptionMatch;

  //badmatch
  if (ship <= 50) {
    titleMatch = `:broken_heart: ${ship}% :broken_heart:`;
    descriptionMatch = `${user1} e ${user2} não fazem um belo par.`;
    emojiImage = `./assets/image/emojis/broken.png`;
  }
  //perfectmatch
  else if (ship === 100) {
    titleMatch = `:heart: ${ship}% :heart:`;
    descriptionMatch = `${user1} e ${user2} fazem um par perfeito!`;
    emojiImage = `./assets/image/emojis/heart.png`;
  }
  //maybecanbeapar
  else if (ship >= 50) {
    titleMatch = `:woman_shrugging: ${ship}% :woman_shrugging:`;
    descriptionMatch = `${user1} e ${user2} podem ser um par!`;
    emojiImage = `./assets/image/emojis/maybe.png`;
  }

  let avatar1 = user1.user.displayAvatarURL;
  let avatar2 = user2.user.displayAvatarURL;

  if (avatar1.endsWith(".png")) avatar1 = avatar1 + "?size=128";
  if (avatar2.endsWith(".png")) avatar2 = avatar2 + "?size=128";

  await mergeImg([
    `${avatar1.replace(".gif", ".png")}`,
    `${emojiImage}`,
    `${avatar2.replace(".gif", ".png")}`
  ]).then(coupleImage => {
    coupleImagePath = `./assets/image/couple/couple_${message.guild.id}_${user1.user.id}_${user2.user.id}.png`;

    let attachment = new Discord.Attachment(
      `./assets/image/couple/couple_${message.guild.id}_${user1.user.id}_${user2.user.id}.png`,
      `couple_${message.guild.id}_${user1.user.id}_${user2.user.id}.png`
    );

    coupleImage.write(coupleImagePath, image => {
      const coupleMatchEmbed = new Discord.RichEmbed()
        .setColor(config.color)
        .setTitle(titleMatch)
        .attachFile(attachment)
        .setImage(
          `attachment://couple_${message.guild.id}_${user1.user.id}_${user2.user.id}.png`
        )
        .setDescription(descriptionMatch)
        .setTimestamp()
        .setFooter(message.author.username, message.guild.iconURL);
      message.channel.send(coupleMatchEmbed);
    });
  });
};

exports.help = {
  name: "ship",
  category: "Diversão"
};
