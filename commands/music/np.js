const lista = require('../../assets/js/queue.js')
const Discord = require("discord.js");
const moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')

exports.run =  async (xerphos, message, args) => {

console.log(`Comando np ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var serverQueue = lista.queue.get(message.guild.id)

if(!serverQueue) {
    message.channel.send({
        embed: {
            description: `<:nao:670446668092801064> - ${message.author}, não há nada tocando.`,
            color: 0xB1A0A8,
        
                }
            }).then(msg => {
        msg.delete(5000)
    })

} else if(serverQueue.radio) {

    
    var inicio = lista.queue.get(message.guild.id).inicio
    var timeAtual = (new Date() - inicio)/1000
    var atual = moment.duration.format([moment.duration((timeAtual*1000))], 'hh:mm:ss').toString()
    atual = atual.length === 2 ? `00:${atual}` : atual
    
    var npE = new Discord.RichEmbed()

        .setColor(0xB1A0A8)
            .setFooter(message.author.username, message.author.displayAvatarURL)
                .setTimestamp()
                    .addField(`🎶 ▸ Tocando agora:`, `**${serverQueue.soms[0].title}**`, false)
                        .addField('⏰ ▸ Duração:', `**\`[${atual} | LIVE]\`**`, true)
                            .addField('🌀 ▸ Enviado por:', `**\`${serverQueue.soms[0].inserido}\`**`, true)
                                .setThumbnail(serverQueue.soms[0].thumb)

    message.channel.send(npE).then(async music => {

await music.react('⏹')

    var stop = music.createReactionCollector((r, u) => r.emoji.name === "⏹" && u.id === message.author.id, { time: 30000 });
        
        stop.on("collect", async r => {

            music.delete()
            message.delete()

            message.channel.send({
                embed: {
                    description: `<:sim:670446566557089843> - ${message.author}, **desligando** a rádio no canal **\`${serverQueue.canalVoz.name}\`**`,
                    color: 0xB1A0A8,
                }
            })

            serverQueue.connection.disconnect()
            lista.queue.delete(message.guild.id)
        })
    })

} else {

    var inicio = lista.queue.get(message.guild.id).inicio
    var timeAtual = (new Date() - inicio)/1000
    var atual = moment.duration.format([moment.duration((timeAtual*1000))], 'hh:mm:ss').toString()
    atual = atual.length === 2 ? `00:${atual}` : atual
    
    var npE = new Discord.RichEmbed()

        .setColor(0xB1A0A8)
            .setFooter(message.author.username, message.author.displayAvatarURL)
                .setTimestamp()
                    .addField(`🎶 ▸ Tocando agora:`, `**${serverQueue.soms[0].title}**`, false)
                        .addField('⏰ ▸ Duração:', `**\`[${atual} | ${serverQueue.soms[0].duracao}]\`**`, true)
                            .addField('🌀 ▸ Enviado por:', `**\`${serverQueue.soms[0].inserido}\`**`, true)
                                .setThumbnail(serverQueue.soms[0].thumb)

    message.channel.send(npE).then(async music => {

        await music.react('🔄')
            await music.react('⏩')
                await music.react('⏹')

        var restart = music.createReactionCollector((r, u) => r.emoji.name === "🔄" && u.id === message.author.id, { time: 30000 });
        var stop = music.createReactionCollector((r, u) => r.emoji.name === "⏹" && u.id === message.author.id, { time: 30000 });
        var skip = music.createReactionCollector((r, u) => r.emoji.name === "⏩" && u.id === message.author.id, { time: 30000 });

restart.on("collect", async r => {
        
    serverQueue.restart = true
    serverQueue.connection.dispatcher.end('Restart');
    setTimeout(() => {
      serverQueue.restart = false
    }, 1500);
    music.delete()
    message.delete()

    })

skip.on("collect", async r => {
        
        serverQueue.connection.dispatcher.end('Skip');
        music.delete()
        message.delete()
    
    })

stop.on("collect", async r => {

        serverQueue.soms = [];
        serverQueue.connection.dispatcher.end('Stop');
        music.delete()
        message.delete()

            })
        })
    } 
} catch (e) {

    console.log(`Erro comando de NP - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}

exports.help = {
    name: "np",
    aliases: ["np"],
    diretorio: "Song"
  }