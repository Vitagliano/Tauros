const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    await message.delete()

    let mensg = args.join(' ')
    if (!mensg) {
        message.channel.send(`${message.author}, digite uma sugestão. :mailbox_with_no_mail:`)
        return undefined;
    }

    const embed = new Discord.RichEmbed()
        .setAuthor(`Sugestão de: ${message.author.username}`, message.author.displayAvatarURL)
        .setDescription(`${mensg}`)
        .setColor('RANDOM')
        .setThumbnail(message.author.displayAvatarURL)
        .setTimestamp()
    client.channels.get(`673699247744614405`).send(embed)
        .then(async function (msg) {
            await msg.react("👍");
            msg.react("👎"); 

            message.channel.send(`${message.author}, sua sugestão foi enviada em <#673699247744614405>. :mailbox_with_no_mail:`).then(msg => msg.delete(5000))
        }).catch(function (error) {
            console.log(error);
        });
}

exports.help = {
    name: "sugestao",
    aliases: [
        "sugerir",
        "sugestão"
    ],
    category: "Utilidades"
}