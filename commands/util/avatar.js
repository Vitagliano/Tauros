const Discord = require("discord.js");
const config = require("../../config.json")

exports.run = (client, message, args) => {
      let user = message.mentions.users.first() || message.author
      const embed = new Discord.RichEmbed()
            .setTitle(`Avatar de ${user.tag}`)
            .setDescription(`Clique **[aqui](${user.displayAvatarURL})** para baixar a imagem!`)
            .setImage(user.displayAvatarURL)
            .setColor(config.color)
            .setTimestamp()
            .setFooter(message.author.username, message.author.displayAvatarURL)
    message.channel.send({embed})
}
exports.help = {
    name: 'avatar',
    description: 'Mostra o avatar de um usuário',
    usage: 'avatar',
    category: "Utilidades"
};