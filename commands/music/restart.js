const lista = require('../../assets/js/queue.js')

exports.run =  async (client, message, args) => {

console.log(`Comando Restart ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

try {

var serverQueue = lista.queue.get(message.guild.id)

if(!message.member.roles.some(r=>["DJ", "dj"].includes(r.name))) {
    
    message.channel.send({
      embed: {
          title: `<:nao:670446668092801064> apenas usuários com cargo \`DJ\` podem reiniciar a música.`,
          color: 0xB1A0A8,
      
      }
  })
}

if(!message.member.voiceChannel) {
    
    message.channel.send({
    embed: {
        title: `<:nao:670446668092801064> - você não esta em um canal de voz!`,
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
            title: `<:nao:670446668092801064> - não é possível reiniciar uma rádio.`,
            color: 0xB1A0A8,
        
                }
            }).then(msg => {
        msg.delete(5000)
    })

} else {

    serverQueue.restart = true
    serverQueue.connection.dispatcher.end('Restart');
    setTimeout(() => {
      serverQueue.restart = false
    }, 1500)
}

} catch (e) {

    console.log(`Erro comando de Restart - guild: id:(${message.guild.id}) - nome:(${message.guild.name}) Erro: ${e}`)
    }
}

exports.help = {
    name: "restart",
    aliases: ["restart"],
    diretorio: "Song"
  }