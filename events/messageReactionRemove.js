exports.name = 'messageReactionRemove';
const Discord = require("discord.js");
const guildDB = require("../models/guild");


exports.run = async (client, reaction, user) => {

    if (reaction.emoji.name !== "⭐" || user.bot) return;

    const message = reaction.message;

    const linkRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gmi.exec(message)

    const image = message.attachments.size > 0 ? message.attachments.first().url : null;

    if (message.author.bot) return;

    guildDB.findOne({
        guildID: message.guild.id
    }, async function (err, doc) {

        const msgs = await message.guild.channels.get(doc.config.starBoard.starChannel).fetchMessages();

        const msg = msgs.array().find(({ embeds }) => embeds && embeds.length && embeds[0].footer && embeds[0].footer.text == message.id);
        
        if (reaction.count === 0 && msg) msg.delete()

        if (reaction.count >= doc.config.starBoard.minStars) {
            const embed = new Discord.RichEmbed()
                .setColor("#B1A0A8")
                .setTimestamp()
                .setAuthor(`⭐ ${reaction.count} - ${message.author.tag}`, message.author.displayAvatarURL)
                .setDescription(` [Ir para a mensagem](https://discordapp.com/channels/${message.guild.id}/${ message.channel.id}/${message.id})
                 ${message.content}`)
                .setFooter(message.id)
            if (image || (linkRegex && linkRegex.length > 0)) {
                embed.setImage(image ? image.url : linkRegex.length > 0 ? linkRegex[0] : '');
            }
            if (!msg) {
                message.guild.channels.get(doc.config.starBoard.starChannel).send(embed)
            } else {
                msg.edit(embed)
            }
        }
    })
};