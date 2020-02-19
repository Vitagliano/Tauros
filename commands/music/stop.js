const lista = require('../../assets/js/queue.js')

exports.run =  async (client, message, args) => {

console.log(`Comando stop ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var serverQueue = lista.queue.get(message.guild.id)

if(!message.member.roles.some(r=>["DJ", "dj"].includes(r.name))) {
    return message.channel.send({
      embed: {
          title: `<:nao:670446668092801064> - apenas usuários com cargo \`DJ\` podem parar músicas!`,
          color: 0xB1A0A8,
      
      }
  })
}
  
if(!message.member.voiceChannel) {

        return message.channel.send({
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
            description: `🎶 - ${message.author}, desligando a rádio do canal \`${serverQueue.canalVoz.name}\``,
            color: 0xB1A0A8,
        }
    })

    serverQueue.connection.disconnect()
    lista.queue.delete(message.guild.id)

} else {

serverQueue.soms = [];
serverQueue.connection.dispatcher.end('Stop');
console.log(`Parei de tocar - Na guild: id(${message.guild.id}) - nome(${message.guild.name}) - Author: ${message.author.tag}`)
    
    }
} catch (e) {

    console.log(`Erro comando de Stop - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}

exports.help = {
    name: "stop",
    aliases: ["stop"],
    diretorio: "Song"
  }