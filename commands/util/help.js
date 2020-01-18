const Discord = require("discord.js");

module.exports.run = async (client, msg) => {
  if (msg.author.id === "261936490702045186" && "488885110251192330") {
    msg.channel.send("Você foi blacklisted seu fdp");
  } else {
    let embed = new Discord.RichEmbed()
      .setThumbnail(client.user.avatarURL)
      .setColor("#B1A0A8")
      .setTitle("Eu to ligado.")
      .setDescription("Da uma olhada na dash: `http://localhost:3000`")
      .setFooter(`Tauros`, client.user.avatarURL)
      .setTimestamp();

    msg.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  type: "bot"
};
