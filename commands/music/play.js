const config = require("../../config.json");
const ytdl = require("ytdl-core")
const YouTube = require('simple-youtube-api')
const youtube = new YouTube(process.env.YTAPI)
const fetchVideoInfo = require('youtube-info')
const Discord = require("discord.js")
const lista = require('../../assets/js/queue.js')

exports.run =  async (client, message, args, settings) => {

// console.log(`Comando play ${message.guild.name} ${message.guild.id} ${message.author.tag}`)

const voiceChannel = message.member.voiceChannel;
var serverQueue = lista.queue.get(message.guild.id);

if(serverQueue) {
    if(serverQueue.radio == true)  lista.queue.delete(message.guild.id);
        if(voiceChannel !== message.guild.members.get(client.user.id).voiceChannel) return message.channel.send({
        embed: {
            title: `<:nao:670446668092801064> - ${message.author}, conecte-se ao **canal de voz** que eu estou para **continuar**!`,
            color: 0xB1A0A8,
        }
    })
}

if(!args[0]) return message.channel.send({
    embed: {
        description: `<:nao:670446668092801064> - ${message.author}, insira o **NOME** ou **URL** da música desejada.`,
        color: 0xB1A0A8,
    
    }
}).then(msg => msg.delete(5000))

var searchString = args.slice(0).join(' ')
var url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';

		if(!voiceChannel) return message.channel.send({
            embed: {
                description: `<:nao:670446668092801064> - ${message.author}, entre em um **canal de voz**!`,
                color: 0xB1A0A8,
            
            }
        }).then(msg => {
            msg.delete(5000)
        })

var permissions = voiceChannel.permissionsFor(message.client.user);

		if(!permissions.has('CONNECT')) {
			message.channel.send({
                embed: {
                    description: `<:nao:670446668092801064> - ${message.author}, não tenho a permissão **CONNECT** para me conectar ao canal.`,
                    color: 0xB1A0A8,
                
                }
            }).then(msg => {
                msg.delete(5000)
            })
        };

		if(!permissions.has('SPEAK')) {
			message.channel.send({
                embed: {
                    description: `<:nao:670446668092801064> - ${message.author}, não tenho a permissão **SPEAK** para tocar músicas no canal.`,
                    color: 0xB1A0A8,
                
                }
            }).then(msg => {
                msg.delete(5000)
            })
        };

        if(url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

            var tumb = message.guild.iconURL
            if(!tumb) tumb = message.client.user.displayAvatarURL

            var Ma = await message.channel.send({
                embed: {
                    description: `🎶 - ${message.author}, estou me conectando ao **YouTube**`,
                    color: 0xB1A0A8,
                    }
                })

                setTimeout(async () => {

                    var Mb = await Ma.edit({
                             embed: {
                                description: `🔄 - ${message.author}, estou procurando a sua **playlist**`,
                                 color: 0xB1A0A8,
                                 }
                             })
                            
                          return OKp(Mb)   
                     }, 1200)

async function OKp(Mb) {

        setTimeout(() => {

            youtube.getPlaylist(url).then(async playlist => {
                playlist.getVideos().then(async videos => {
                    videos.forEach(async video2 => {

            fetchVideoInfo(video2.id, async function (err ,video3) {

            await handleVideo(video3, message, voiceChannel, true);

                })
            })

            message.channel.startTyping()
            var embed = new Discord.RichEmbed()

                    .setTitle('🎶 Música adicionada a **Playlist**:')
                        .setThumbnail(tumb)
                            .setFooter(`${message.author.username}`, message.client.user.displayAvatarURL)
                                .setTimestamp()
                                    .setColor(0xB1A0A8)
                                        .setDescription(`**•** Nome: **${playlist.title}**\n**•** Músicas: **${videos.length}**\n**•** Autor: ${message.author}`)
                                        
            Mb.edit(embed)
            message.channel.stopTyping()

                })
            }).catch(() => {
                
            Mb.edit({
                    embed: {
                        description: `<:nao:670446668092801064> - ${message.author}, essa **Playlist** não \`existe\` **ou é** \`privada\`**`,
                        color: 0xB1A0A8,
                            }
                        })    
                    })
                }, 1500)
            }
            
		} else if(args.length === 1 && args[0].startsWith('https://www.youtube.com/watch?v=')) {

        try {
   
            await youtube.getVideo(url).then(vid => {
            
            fetchVideoInfo(vid.id, async function (err ,vide) {

            return handleVideo(vide, message, voiceChannel)
                })
            })

        } catch (e) {

            message.channel.send({
                embed: {
                    description: `<:nao:670446668092801064> - ${message.author},  nenhum resultado foi obtido apartir dessa url.`,
                    color: 0xB1A0A8,
                    }
                })
            }

        } else {

                    var Ma = await message.channel.send({
                        embed: {
                            description: `🎶 - ${message.author}, estou me conectando ao **YouTube**`,
                            color: 0xB1A0A8,
                            }
                        })

                        setTimeout(async () => {

                            var Mb = await Ma.edit({
                                     embed: {
                                        description: `🔄 - ${message.author}, estou buscando **resultados**`,
                                         color: 0xB1A0A8,
                                         }
                                     })
                                    
                                  return OK(Mb)   
                             }, 1200)

async function OK(Mb) {
            
                    var videos = await youtube.searchVideos(searchString, 5)
                    if(!videos.length > 0 || videos.length < 5) {
                    
                    setTimeout(async () => { 

                            Mb.edit({
                                embed: {
                                    description: `<:nao:670446668092801064> - ${message.author}, não encontrei nenhum resultado`,
                                    color: 0xB1A0A8,
                                }
                            })
                        }, 1200)
                    } else {

                    var tumb = message.guild.iconURL
                    if(!tumb) tumb = message.client.user.displayAvatarURL

                    var index = 0
                    var razao = args.slice(0).join(' ')
                    //if(!razao) razao = "Sem Pesquisa"

                    setTimeout(async () => {

                    var embedM = new Discord.RichEmbed()

                    .setTitle(`🔎 ▸ Resultados: **${razao}**`)
                        .setTimestamp()
                            .setColor(0xB1A0A8)
                                .setFooter(`Você tem 20 segundos para escolher, digite "cancelar" para cancelar a ação.`, message.client.user.displayAvatarURL)
                                .setDescription(`\n${videos.map(video2 => `**\`[${++index}]\` -** ${video2.title}`).join('\n')}**\n`)
                                        .setThumbnail(tumb)

                    Mb.edit(embedM).then(async msg => {

                    message.channel.awaitMessages(message1 => message.content, {
                        max: 1,
                        time: 20000,
                        errors: ['time']
                    }).then(async coletado => {

                    var mes = coletado.first().content === 'cancelar' || coletado.first().content > 0 && coletado.first().content < 6
                    
                    if(coletado.first().content === 'cancelar') {
                    
                        cancelou();

                    } else if(coletado.first().content > 0 && coletado.first().content < 6) {
                        
                        var num = parseInt(coletado.first().content);
                        var video = await youtube.getVideoByID(videos[num - 1].id); 

                        //console.log(video)
                        
                        fetchVideoInfo(video.id, async function (err ,vido) {

                        await handleVideo(vido, message, voiceChannel);
                        
                    })
                } else if(!mes) {
                        
                        message.channel.send({
                            embed: {
                                description: `<:nao:670446668092801064> - ${message.author}, resposta invalida, tente novamente.`,
                                color: 0xB1A0A8,
                            
                            }
                        }).then(msg => {
    
                            msg.delete(5000)
                    })
                }

                    msg.delete()

                }).catch(err => {
                    
                    msg.delete()
                    message.channel.send({
                        embed: {
                            description: `<:nao:670446668092801064> - ${message.author}, o tempo acabou, tente novamente.`,
                            color: 0xB1A0A8,
                        
                            }
                        })
                    })
                })
            }, 1500)
        }
    }
};

async function cancelou() {

var a = await message.channel.send({
    embed: {
        description: `🔄 - ${message.author}, cancelando a busca.`,
        color: 0xB1A0A8,
    
    }
})

setTimeout(() => {

a.edit({
    embed: {
        description: `<:sim:670446566557089843> - ${message.author}, busca cancelada com sucesso!`,
        color: 0xB1A0A8,
            }
        })
    }, 2000)
};

async function handleVideo(video, message, voiceChannel, playlist = false) {
    
var serverQueue = lista.queue.get(message.guild.id);

    var song = {

        id: video.videoId,
        title: video.title,
        url:  video.url,
        inserido: message.author.tag,
        duracao: null,
        thumb: video.thumbnailUrl,
        duracaoT: video.duration,
        numero: 1
    };

    if(!serverQueue) {

        var queueConstruct = {

            canalTexto: message.channel,
			canalVoz: voiceChannel,
			volume: 5,
            radio: false,
            soms: [],
            music: true,
            atual: 0,
            inicio: new Date(),
            restart: false,
            restarM: [],
            connection: null,
            voz: true,
            join: false,
            duraTotal: null
        };

        lista.queue.set(message.guild.id, queueConstruct);
        queueConstruct.soms.push(song);
        queueConstruct.duraTotal = song.duracaoT
       
    try {

        var connection = await message.member.voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.soms[0]);
        
    } catch (err) {
        
        console.log(`I could not get into the voice channel Guild - nome:(${message.guild.name}) id:(${message.guild.id}), erro: ${err}`); 

		message.channel.send({
                embed: {
                    description: `<:nao:670446668092801064> - ${message.author}, não consegui entrar no canal de voz.`,
                    color: 0xB1A0A8,
            }
        })

        lista.queue.delete(message.guild.id); 
    }

} else {

            let tempo = Math.floor(song.duracaoT)
            let horas;
            let minutos;
            let minutos2;
            let segundos;
    
            if (tempo >= 3600) {
    
                horas = Math.floor(tempo / 60 / 60)
                minutos = Math.floor(tempo / 60)
                minutos2 = Math.floor(tempo / 60 - horas * 60)
                segundos = Math.floor(tempo - (minutos * 60))
    
            } else {
    
                horas = 0
                minutos = Math.floor(tempo / 60)
                minutos2 = Math.floor(tempo / 60)
                segundos = Math.floor(tempo - (minutos * 60))
            }

        song.duracao = `${(horas < 10 ? '0' + horas : horas) + ':' + (minutos2 < 10 ? '0' + minutos2 : minutos2) + ':' + (segundos < 10 ? '0' + segundos : segundos)}`,
        song.numero = serverQueue.soms.length+1
        serverQueue.duraTotal = serverQueue.duraTotal+song.duracaoT

        serverQueue.soms.push(song)

        if(playlist) return undefined;

        var embed = new Discord.RichEmbed()

            .addField('🎶 ▸ Adicionado a Playlist:', `**${song.title}**`, false)
                .addField(`⏰ ▸ Duração:`, `**\`[${song.duracao}]\`**`, true)
                    .addField('🌀 ▸ Enviado por:', `**\`${song.inserido}\`**`, true)
                        .setFooter(`${message.author.username}`, message.client.user.displayAvatarURL)
                            .setTimestamp()
                                .setColor(0xB1A0A8)
                                    .setThumbnail(song.thumb)

        message.channel.send(embed).then(msg => msg.delete(15000))
    }

    return undefined;
};

async function play(g, s) {

var serverQueue = lista.queue.get(g.id);

if(!s) {

    serverQueue.connection.disconnect();
    lista.queue.delete(g.id);

    return message.channel.send({
        embed: {
            description: `Todas as músicas da playlist foram tocadas! Use \`${settings.prefix}play\` para voltar a tocar.`,
            color: 0xB1A0A8,
        }
    })
} else {

//console.log(s)

const dispatcher = serverQueue.connection.playStream(ytdl(s.url)).on('end', reason => {

console.log(`Música - Skip/Stop/Restart - Na guild: id(${message.guild.id}) - nome(${message.guild.name}) Razão: ${reason}`)
    
if(reason === 'Sem músicas em Fila')

console.log(`Música - Skip/Stop/Restart - Na guild: id(${message.guild.id}) - nome(${message.guild.name}) Razão: ${reason}`)

serverQueue.inicio = new Date();

if(serverQueue.restart === true) {

    play(g, serverQueue.soms[0])
} else {

serverQueue.soms.shift();
serverQueue.duraTotal = serverQueue.duraTotal-serverQueue.restarM[0].duracaoT
play(g, serverQueue.soms[0])

        serverQueue.soms.map(music => {
        music.numero = music.numero-1
        })
    }

}).on('error', error => {

    console.error(error)

});
 
dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);

        let tempo = Math.floor(s.duracaoT)
        let horas;
        let minutos;
        let minutos2;
        let segundos;

        if (tempo >= 3600) {

            horas = Math.floor(tempo / 60 / 60)
            minutos = Math.floor(tempo / 60)
            minutos2 = Math.floor(tempo / 60 - horas * 60)
            segundos = Math.floor(tempo - (minutos * 60))

        } else {

            horas = 0
            minutos = Math.floor(tempo / 60)
            minutos2 = Math.floor(tempo / 60)
            segundos = Math.floor(tempo - (minutos * 60))
        }

            s.duracao = `${(horas < 10 ? '0' + horas : horas) + ':' + (minutos2 < 10 ? '0' + minutos2 : minutos2) + ':' + (segundos < 10 ? '0' + segundos : segundos)}`
            serverQueue.restarM = []
            serverQueue.restarM.push(s)

    var embedH = new Discord.RichEmbed()
        .addField('🎶 ▸ Tocando agora:', `**${s.title}**`, false)
            .addField('⏰ ▸ Duração:', `**\`[${s.duracao}]\`**`, true)
                .addField('🌀 ▸ Enviado por:', `**\`${s.inserido}\`**`, true)
                        .setColor(0xB1A0A8)
                            .setThumbnail(s.thumb)
        
    serverQueue.canalTexto.send(embedH).then(msg => msg.delete(15000))

        }
    }
}

exports.help = {
    name: "play",
    aliases: ["play", "touch"],
    diretorio: "Song"
  }
