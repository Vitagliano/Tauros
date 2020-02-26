const {
    Canvas
} = require('canvas-constructor');
const {
    Attachment
} = require('discord.js');
const {
    resolve,
    join
} = require('path');
const fetch = require('node-fetch');
const profileDB = require("../../models/profile");


const imageUrlRegex = /\?size=2048$/g;
const placeholder = new Map();

exports.run = async (client, message, args) => {

    profileDB.findOne({
        userID: message.author.id
    }, async function (err, doc) {
        try {

            const buffer = await profile(message);
            const filename = `profile-${message.author.id}.jpg`;
            const attachment = new Attachment(buffer, filename);
            await message.channel.send(attachment);

        } catch (error) {
            return message.channel.send(`Ocorreu um erro: **${error.message}**`);
        }

        async function profile(message) {
            const member = message.member;

            const maxXP = doc.level * 1000
            const xp = doc.xp

            let barrasAndando = xp / maxXP * 100 * 5.3;


            try {
                const result = await fetch(member.user.displayAvatarURL.replace(imageUrlRegex, '?size=128'));
                if (!result.ok) throw new Error('Não consegui obter o avatar do usuário!');
                const avatar = await result.buffer();

                const name = member.displayName.length > 30 ? member.displayName.substring(0, 17) + '...' :
                    member.displayName;

                Canvas.registerFont(resolve(join(__dirname, "../../assets/font/Montserrat-Regular.ttf")), "Montserrat-Regular");

                return new Canvas(400, 180)
                    .setColor('#424242')
                    .addRect(57 + 100, 60 + 100, 530, 30 - 60) //barra
                    .setColor('#0b5a96')
                    .addRect(57 + 100, 60 + 100, Math.floor(barrasAndando), 30 - 60)
                    .setColor('#B1A0A8')
                    .addRect(84, 0, 316, 180)
                    .setColor("#2C2F33")
                    .addRect(0, 0, 84, 180)
                    .addRect(169, 26, 231, 46)
                    .addRect(224, 108, 176, 46)
                    .setShadowColor('rgba(22, 22, 22, 1)')
                    .setShadowOffsetY(5)
                    .setShadowBlur(10)
                    .addCircle(84, 90, 62)
                    .addCircularImage(avatar, 85, 90, 64)
                    .save()
                    .createBeveledClip(20, 138, 128, 32, 5)
                    .setColor('#23272A')
                    .fill()
                    .restore()
                    .setTextAlign('center')
                    .setTextFont('18pt Montserrat-Regular')
                    .setColor('#FFFFFF')
                    .addText(name, 285, 54)
                    .addText(`Level: ${doc.level.toLocaleString()}`, 84, 162)
                    .setTextAlign('left')
                    .addText(`XP: ${doc.xp.toLocaleString()}`, 241, 140)
                    .toBuffer();
            } catch (error) {
                await message.channel.send(`Ocorreu um erro: **${error.message}**`);
            }
        }
    })
}

exports.help = {
    name: 'canvas',
    category: 'Utilidades',
    aliases: [],
    description: 'Use Canvas to create images and add data to them.',
    usage: 'canvas'
};