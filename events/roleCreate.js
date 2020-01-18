const Discord = require("discord.js");

exports.name = "roleCreate";

exports.run = async (client, role) => {
  const embed = new Discord.RichEmbed()
    .setColor("#B1A0A8")
    .setTimestamp()
    .setAuthor("Cargo criado!")
    .addField(`📎 ID:`, role.id)
    .addField(`🔰 COR:`, role.hexColor)
    .addField(`📝 NOME:`, role.name);
  client.channels.get("666833134217723945").send({ embed: embed });
};
