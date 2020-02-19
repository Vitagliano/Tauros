const lista = require('../../assets/json/radio.json')

exports.run =  async (client, message, args, settings) => {

console.log(`Command leave ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var voicechannel = message.member.voiceChannel;
var serverQueue = lista.queue.get(message.guild.id);

if(serverQueue) {

    if(serverQueue.music === true) return message.channel.send({
        embed: {
            description: `<:nao:670446668092801064> - ${message.author}, existe uma música tocando, use **\`${settings.prefix}stop\`** para parar a música.`,
            color: 0x36393e,
        }
    })

if(serverQueue.radio === true) return message.channel.send({
        embed: {
            description: `🎶 - ${message.author}, I'm **playing** radio, USE**\`${settings.prefix}radio leave\`**to stop **playing**`,
            color: 0x36393e,
        }
    })
}

if(message.guild.members.get(xerphos.user.id).voiceChannel) {
    if(voicechannel) {
        if(message.member.voiceChannel.id === message.guild.members.get(xerphos.user.id).voiceChannel.id) {

let vc = message.guild.members.get(xerphos.user.id).voiceChannel

message.guild.voiceConnection.disconnect()

message.channel.send({
        embed: {
            title: `🎶 - Desconectado do canal de voz **\`${vc.name}\`**!`,
            color: 0x36393e,
        
        }
    })
    
} else {

    message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - entre no canal de voz que eu estou.`,
            color: 0x36393e,
            }
        })
    }
} else {

    message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - entre em um canal de voz.`,
            color: 0x36393e,
            }
        })

    }
} else {

    message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - não estou conectado a um canal de voz.`,
            color: 0x36393e,
            }
        })
    }
} catch (e) {

    console.log(`Erro comando de Leave - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}

exports.help = {
    name: "leave",
    aliases: ["leave"],
    diretorio: "Song"
  }