const Discord = require("discord.js");
const profileDB = require("../../models/profile");
const moment = require("moment");
require("moment-duration-format");
moment.locale("pt-BR");

exports.run = async (client, message, args, member) => {
  profileDB.findOne(
    {
      userID: message.author.id
    },
    async function(err, doc) {
      if (doc) {
        let value = Math.round(Math.random() * 300) + 50;
        const time = moment.duration.format(
          [moment.duration(parseInt(doc.daily) + 86400000 - Date.now())],
          "D MMMM YYYY, h:mm:ss"
        );
        if (parseInt(doc.daily) + 86400000 <= Date.now()) {
          doc.coins += value;
          doc.daily = Date.now();
          doc.save();
          message.channel.send(`Você recebeu ${value} coins`);
        } else {
          message.channel.send(
            `Você só pode pegar seus coins diários daqui ${time}`
          );
        }
      } else {
        const newUser = new profileDB ({
          guildID: message.guild.id,
          guildName: message.guild.name,
          userID: message.author.id,
          username: message.author.tag
        });

        try {
          await newUser.save();
          console.error(`Perfil de ${message.author.tag} foi criado`)
        } catch (err) {
          console.error(err);
        }
        message.channel.send("Não te encontrei no meu banco de dados, estou te registrando... Digite o comando novamente!");
      }
    }
  );
};

exports.help = {
  name: "daily",
  aliase: ["diario"],
  category: "Economia"
};
