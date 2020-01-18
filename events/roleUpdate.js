const Discord = require("discord.js");

exports.name = "roleUpdate";

exports.run = async (client, oldRole, newRole) => {
  if (oldRole.name !== newRole.name) {
    const embed = new Discord.RichEmbed()
      .setColor("#B1A0A8")
      .setTimestamp()
      .setAuthor('Cargo atualizado')
      .addField(`📎 ID:`, oldRole.id)
      .addField(`📤 NOME ANTERIOR:`, oldRole.name)
      .addField(`📥 NOVO NOME:`, newRole.name);
    return client.channels.get("666833134217723945").send({ embed: embed });
  }
  if (oldRole.hexColor !== newRole.hexColor) {
    const embed = new Discord.RichEmbed()
      .setColor("#B1A0A8")
      .setTimestamp()
      .setThumbnail(`https://dummyimage.com/250/${oldRole.hexColor.replace('#','')}/&text=%20`)
      .setImage(`https://dummyimage.com/1000/${newRole.hexColor.replace('#','')}/&text=%20`)
      .setAuthor(`A cor do cargo "${oldRole.name}" foi atualizada`)
      .setDescription(`\n**⚙ Nome:** \n${oldRole.name} \n\n **📎 ID:** \n${oldRole.id} \n\n **📤 Antiga:** \n${oldRole.hexColor} \n\n **📥 Nova:** \n${newRole.hexColor}`)
    return client.channels.get("666833134217723945").send({ embed: embed });
  }
  if (oldRole.rawPosition !== newRole.rawPosition) {
    const embed = new Discord.RichEmbed()
      .setColor("#B1A0A8")
      .setTimestamp()
      .setAuthor('A posição do cargo foi atualizada')
      .addField(`⚙ NOME:`, oldRole.name)
      .addField(`📎 ID:`, oldRole.id)
      .addField(`📤 POSIÇÃO ANTERIOR:`, oldRole.rawPosition)
      .addField(`📥 NOVA POSIÇÃO:`, newRole.rawPosition);
    return client.channels.get("666833134217723945").send({ embed: embed });
  }
};
