const Discord = require("discord.js")

exports.run =  async (client, message, args) => {

// console.log(`comando spotify ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

// try {
 
// var user = message.mentions.users.first() || message.author;

//     if (user.presence.game !== null && user.presence.game.type === 2 && user.presence.game.name === 'Spotify' && user.presence.game.assets !== null) {
//      var trackImg = user.presence.game.assets.largeImageURL;
//      var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
//      var trackName = user.presence.game.details;
//      var trackAlbum = user.presence.game.assets.largeText;
//      var trackAuthor = user.presence.game.state;

// const embed = new Discord.RichEmbed()
//             .setTitle(`<:spotify:538537989660213269> ▸ Spotify - **${user.tag}**`)
//             .setColor('#36393e')
//             .setThumbnail(trackImg)
//             .setFooter(`${message.author.username}`, message.author.displayAvatarURL)
//             .addField("<a:music:512400492836683791> ▸ Name of the song:", `**${trackName}**`)
//             .addField("<:cd:538538777505955872> ▸ Album:", `**${trackAlbum}**`)
//             .setTimestamp()
//             .addField("<:singer:538538767779364867> ▸ Author(s):", `**${trackAuthor}**`)
//             .addField('<:listening:538543117373014016> ▸ **Hear Also:**', `***[Click Here](${trackUrl})***`);
            
//         return message.channel.send(embed);
        
        
   
//     } else {
//         return message.channel.send({embed: {
//             description: `<:error:538505640889417752> - **${user.username},** Não está ouvindo Spotify.`,
//             color:  0xB1A0A8
//         }}).then(msg => msg.delete(5000));
//     }
// } catch (e) {

//     console.log(`Erro comando de Spotify - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
//     }
}

exports.help = {
    name: "spotify",
    aliases: ["spotify"],
    diretorio: "Song"
  }