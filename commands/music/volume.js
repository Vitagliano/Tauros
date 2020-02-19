const lista = require('../../assets/js/queue.js')

exports.run =  async (client, message, args) => {

console.log(`Comando volume ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var serverQueue = lista.queue.get(message.guild.id);
var deleteCount = parseInt(args[0], 10);

if(!message.member.roles.some(r=>["DJ", "dj"].includes(r.name))) {
    return message.channel.send({
      embed: {
          title: `<:nao:670446668092801064> - apenas usuários com cargo \`DJ\` podem alterar o volume!`,
          color: 0xB1A0A8,
      }
  })
}

if(!message.member.voiceChannel) {
    
    message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - você não esta em um canal de voz.`,
            color: 0xB1A0A8,
            }
        }).then(msg => {
        msg.delete(5000)
    })
}

if(!serverQueue) {
    message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - não há nada tocando.`,
            color: 0xB1A0A8,
            }
        }).then(msg => {
        msg.delete(5000)
    })
} else if(serverQueue.radio) {
        
    message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - não foi possível alterar o volume da rádio`,
            color: 0xB1A0A8,
            }
        }).then(msg => {
        msg.delete(5000)
    })

}  else {
        if(!args[0]) return message.channel.send({
                embed: {
                    title: `**Volume**`,
                    color: 0xB1A0A8,
                    description: `Volume atual: **${serverQueue.volume}**`,
                    footer: {
                        "text": message.author.username,
                        'icon_url': message.author.displayAvatarURL
                    },
                    timestamp: new Date(),
                }
            })
} if(isNaN(args[0])) {

        message.channel.send({
            embed: {
                color: 0xB1A0A8,
                description: `<:nao:670446668092801064> - use apenas números para alterar o **\`volume\`**`,
                footer: {
                    "text": message.author.username,
                    'icon_url': message.author.displayAvatarURL
                },
                timestamp: new Date(),
        }
    })
    
} else if(!deleteCount || deleteCount < 1 || deleteCount > 10) {

message.channel.send({
        embed: {
            color: 0xB1A0A8,
            description: `<:nao:670446668092801064> - use número de \`1\` a \`\`10\`\` para alterar o volume.`,
            footer: {
                "text": message.author.username,
                'icon_url': message.author.displayAvatarURL
                },
            timestamp: new Date(),
        }
    })
} else {
            
message.channel.send({
            embed: {
                title: ` **Volume**`,
                color: 0xB1A0A8,
                description: `Volume definido para: **${args[0]}**`,
                footer: {
                    "text": message.author.username,
                    'icon_url': message.author.displayAvatarURL
                },
                timestamp: new Date(),
                }
            }).then(opa => {
                serverQueue.volume = args[0];
                serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 10)
                message.delete(5000)
                opa.delete(5000)
            })
        }


} catch (e) {

console.log(`Erro comando de Volume - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}

exports.help = {
    name: "volume",
    aliases: ["volume"],
    diretorio: "Song"
  }