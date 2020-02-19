const lista = require('../../assets/js/queue.js')

exports.run =  async (client, message, args) => {

console.log(`Comando skip ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var serverQueue = lista.queue.get(message.guild.id)

    if(!message.member.roles.some(r=>["DJ", "dj"].includes(r.name))) {

        message.channel.send({
          embed: {
              title: `<:nao:670446668092801064> apenas usuários com cargo \`DJ\` podem pausar a música.`,
              color: 0xB1A0A8,
          
        }
    })
}

if(!message.member.voiceChannel) {
    
    message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - você não está em um canal de voz.`,
            color: 0xB1A0A8,
        
            }  
        }).then(msg => {
            
        msg.delete(5000)
    })
}

if(!serverQueue) {
    message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - nenhuma música na playlist.`,
            color: 0xB1A0A8,
        
            }
        }).then(msg => {
        msg.delete(5000)
        })
} else if(serverQueue.radio) {

    message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - uma **rádio** foi detectada, não é possível pular a música.`,
            color: 0xB1A0A8,
        
                }
            }).then(msg => {
        msg.delete(5000)
    })

} else {
    serverQueue.connection.dispatcher.end('Skip');
    console.log(`Skipped music - ${message.guild.id} - ${message.author.tag}`)
    }

} catch (e) {

    console.log(`Erro comando de Skip - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}

exports.help = {
    name: "skip",
    aliases: ["skip"],
    diretorio: "Song"
  }