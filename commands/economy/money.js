const Discord = require("discord.js");
const profileDB = require("../../models/profile");

exports.run = (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  profileDB.findOne(
    {
      userID: user.id
    },
    async (err, doc) => {
      if (doc) {
        let msg = message.mentions.users.first()
          ? `<@${doc.userID}> tem ${doc.coins} coins`
          : `Você tem ${doc.coins} coins`;
        message.channel.send(msg);
      } else {
        const newUser = new profileDB({
          guildID: message.guild.id,
          guildName: message.guild.name,
          userID: user.id,
          username: user.tag
        });

        try {
          await newUser.save();
          console.error(`Perfil de ${message.author.tag} foi criado`);
        } catch (err) {
          console.error(err);
        }
        message.channel.send(
          "Não te encontrei no meu banco de dados, estou te registrando... Digite o comando novamente!"
        );
      }
    }
  );
};

exports.help = {
  name: "coins",
  aliases: ["money", "saldo"],
  category: "Economia"
};
