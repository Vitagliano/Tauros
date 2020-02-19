const Discord = require("discord.js")
const lista = require('../../assets/js/queue.js')
const radioJson = require("../../assets/json/radio.json")

exports.run =  async (client, message, args, settings) => {

console.log(`Comando radio ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

// try {

// var voicechannel = message.member.voiceChannel;
// var serverQueue = lista.queue.get(message.guild.id);

//     if(serverQueue) {
//         if(serverQueue.music == true) return message.channel.send({
//             embed: {
//                 description: `<:error:538505640889417752> - I'm already playing **\`music\`** on the server. Use **\n${settings.prefix}stop\`** to stop **music**`,
//                 color: 0xB1A0A8,
//             }
//         })
//     }

//     if(!voicechannel) return message.channel.send({
//             embed: {
//                 title: `<:error:538505640889417752> - Connect to a voice channel`,
//                 color: 0xB1A0A8,
            
//             }
//         })

//     if (args[0] == 'list') {
//         var embed = new Discord.RichEmbed();
//         embed.setColor('#36393e');
//         embed.setAuthor("Available Radios", message.guild.iconURL)
//         let polfilter = radioJson.filter(a => a.pais == "Poland")
//         let pol = polfilter.map(b => `ID: \`${b.id}\` ▸ ${b.name}`)
//         let brfliter = radioJson.filter(a => a.pais == "Brazil")
//         let br = brfliter.map(b => `ID: \`${b.id}\` ▸ ${b.name}`)
//         let usfilter = radioJson.filter(a => a.pais == "EUA")
//         let us = usfilter.map(b => `ID: \`${b.id}\` ▸ ${b.name}`)
//         let frfilter = radioJson.filter(a => a.pais == "France")
//         let fr = frfilter.map(b => `ID: \`${b.id}\` ▸ ${b.name}`)
        
//         let embedlist = new Discord.RichEmbed()
//             .setThumbnail(client.user.displayAvatarURL)
//             .setColor('#36393e')
//             .setFooter(`${settings.prefix}radio play [ID/NAME] - Start the Radio`, message.author.displayAvatarURL)
//             .setThumbnail(client.user.displayAvatarURL)
//         var desc = "";
//         radioJson.forEach(r => desc += `${r.id}. ${r.name}\n`);
//         embed.setDescription(`\n<:brazil:513024209925046282> - Brazilian Stations\n\n<:eua:513024190027137025> - American Stations\n\n<:poland:513459025036443649> - Polish Stations\n\n<:france:513459028001685504> - French Stations`)
//         embed.setFooter(message.author.username, message.author.displayAvatarURL)
//         embed.setThumbnail(client.user.displayAvatarURL)
//         embed.setTimestamp()
//         await message.channel.send(embed).then(async msg => {

//         await msg.react('513024209925046282');
//         await msg.react('513024190027137025');
//         await msg.react('513459028001685504');
//         await msg.react('513459025036443649');

//         const filter = (reaction, user) => (reaction.emoji.id === "513024209925046282" || reaction.emoji.id === "513024190027137025" || reaction.emoji.id === "513459028001685504" ||
//         reaction.emoji.id === "513459025036443649") && user.id === message.author.id
//         let collector = await msg.createReactionCollector(filter, { time: 60000 });

//         await collector.on('collect', async react => {
//             if (react.emoji.id == "513024209925046282") {
//                 embedlist.setDescription(`**<:brazil:513024209925046282> - Brazilian Stations**\n\n${br.join('\n')}`)
//                 msg.edit(embedlist)
//                 react.remove(message.author.id)
//             } else if (react.emoji.id == "513024190027137025") {
//                 embedlist.setDescription(`**<:eua:513024190027137025> - American Stations**\n\n${us.join('\n')}`)
//                 msg.edit(embedlist)
//                 react.remove(message.author.id)
//             } else if (react.emoji.id == "513459025036443649") {
//                 embedlist.setDescription(`**<:poland:513459025036443649> - Polish Stations**\n\n${pol.join('\n')}`)
//                 msg.edit(embedlist)
//                 react.remove(message.author.id)
//             } else if (react.emoji.id == "513459028001685504") {
//                 embedlist.setDescription(`**<:france:513459028001685504> - French Stations**\n\n${fr.join('\n')}`)
//                 msg.edit(embedlist)
//                 react.remove(message.author.id)
//             }
//         })
//         msg.delete(60000)
//         message.delete(60000)
//     })
//     } else if (args[0] == 'play') {

//         if(voicechannel !== message.guild.members.get(client.user.id).voiceChannel) return message.channel.send({
//             embed: {
//                 description: `<:error:538505640889417752> - ${message.author}, connect to the **voice** channel I am connected to **continue**`,
//                 color: 0xB1A0A8,
//             }
//         })
//         join(radioJson, message, args, client, settings.prefix);

//     } else if (args[0] == 'leave') {

//         if(voicechannel !== message.guild.members.get(client.user.id).voiceChannel) return message.channel.send({
//             embed: {
//                 description: `<:error:538505640889417752> - ${message.author}, connect to the **voice** channel I'am connected to **to continue**`,
//                 color: 0xB1A0A8,
//             }
//         })
//     leave(message, serverQueue, client);

//     } else {

//         if(serverQueue) {
//             if(serverQueue.radio) {
        
//         var rad = serverQueue.radio;
//         let = rad;
        
//         if(rad === true) rad = "<:on:537007283004243978> Enabled";
//             if(rad === false) rad = "<:off:537007288804704267> Disabled";
//         }

//         } else {
//             let = rad;
//             rad = "<:off:537007288804704267> Disabled";
//         }

//     var embed = new Discord.RichEmbed()

//     .setAuthor('Radio Commands', client.user.displayAvatarURL)
//         .setDescription(`**Status:** ${rad}`)
//         .addField(`**${settings.prefix}radio [list]**`, `To know which radios I have.`)
//         .addField(`**${settings.prefix}radio [play] [radio]**`, `To connect the radio to the server.`)
//         .addField(`**${settings.prefix}radio [leave]**`, `To turn off the radio on the server.`)
//             .setColor('#36393e')
//                 .setFooter(`${message.author.username}`, message.author.displayAvatarURL)
//                     .setTimestamp()
//                         .setThumbnail(message.guild.iconURL)

//     message.channel.send(embed)
// }

// } catch (e) {

//     console.log(`Erro comando de Radio - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
//     }
// }

// async function join(radioJson, message, args, client, settings.prefix) {

//     var voiceChannel = message.member.voiceChannel;
//     var radio = {};
//     var controle = false;

//     if (!voiceChannel) {
//         message.channel.send({
//             embed: {
//                 description: `<:error:538505640889417752> - ${message.author}, you **need** is on a voice channel to connect to **\`radio\`**`,
//                 color: 0xB1A0A8,
//             }
//         })
//     } else {

// var permissions = voiceChannel.permissionsFor(message.client.user);

// 		if(!permissions.has('CONNECT')) {
// 			return message.channel.send({
//                 embed: {
//                     description: `<:error:538505640889417752> - ${message.author}, without permission to connect to the **voice** channel`,
//                     color: 0xB1A0A8,
//                 }
//             })
//         }

// 		if(!permissions.has('SPEAK')) {
// 			return message.channel.send({
//                 embed: {
//                     description: `<:error:538505640889417752> - ${message.author}, without permission to **speak**`,
//                     color: 0xB1A0A8,
//                 }
//             })
//         }

//     radioJson.forEach(r => {
//         if (args[1] == r.id || args.join(' ').slice(5) == r.name) {
//             radio = r;
//             controle = true;
//         }
//     })

//     if(voiceChannel) {
    
//     if (controle == false) {
//         message.channel.send({
//             embed: {
//                 description: `<:error:538505640889417752> - None **radio** found, type **\`${prefix}radio\`** and check the available ** radios`,
//                 color: 0xB1A0A8,
//             }
//         }) 
//     } 

//     if(controle == true) {

//         message.channel.send({
//             embed: {
//                 description: `🎶 - ${message.author}, **Connecting** the radio \`${radio.name}\` to the channel \`${message.member.voiceChannel.name}\``,
//                 color: 0xB1A0A8,
//             }
//         }).then(raP => {
            
//             message.member.voiceChannel.join().then(cnc => {

//             var serverQueue = lista.queue.get(message.guild.id);

//             var song = {
            
//                 title: radio.name,
//                 url:  radio.url,
//                 inserido: message.author.tag,
//                 duracao: '[LIVE]',
//                 numero: 1,
//                 thumb: 'https://image.freepik.com/free-vector/retro-radio-logo_1438-470.jpg'
//             };
//                     if (!serverQueue) {
                        
//                         var queueConstruct = {

//                             volume: 5,
//                             radio: true,
//                             soms: [],
//                             music: false,
//                             atual: 0,
//                             inicio: new Date(),
//                             duraTotal: '[AO VIVO]',
//                             canalVoz: voiceChannel,
//                             connection: cnc
//                         };
                
//                         lista.queue.set(message.guild.id, queueConstruct);
//                         queueConstruct.soms.push(song);

//                         } 
                        
//                         cnc.playStream(radio.url) ,{passes: 1, bitrate: 256000}        
//                     })
                    
//                 })
//             }
//         }
//     }   
// };

// async function leave(message, serverQueue, client) {

//         if (!message.member.voiceChannel) return message.channel.send({
//             embed: {
//                 description: `<:error:538505640889417752> - ${message.author}, you are not on a **voice** channel`,
//                 color: 0xB1A0A8,
//             }
//         })
    
//         var voiceChannel = message.member.voiceChannel;

//         if (!message.guild.members.get(client.user.id).voiceChannel);
//         else if (voiceChannel !== message.guild.members.get(client.user.id).voiceChannel) return message.channel.send('<:314240199406387201:490756225575682049> | Você não está no canal que eu **estou** **\`conectado\`**');
    
//         if (!serverQueue) {
//             message.channel.send({
//                 embed: {
//                     description: `<:error:538505640889417752> - ${message.author}, the radio is not **online** now`,
//                     color: 0xB1A0A8,
//                 }
//             })
//         } else {
        
//         voiceChannel.leave();

//         message.channel.send({
//             embed: {
//                 description: `🎶 - ${message.author}, **turning off** the radio on the channel **\`${message.member.voiceChannel.name}\`**`,
//                 color: 0xB1A0A8,
//             }
//         }).then(leaveR => {
            
//         lista.queue.delete(message.guild.id)
        
//         })
//     }
}


exports.help = {
    name: "radio",
    aliases: ["radio"],
    diretorio: "Song"
  }