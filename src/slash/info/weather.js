const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

const { capitalize, normalize } = require('../../utils');

module.exports = {
  config: {
    name: 'clima',
    description: 'Clima de uma cidade',
    options: [
      {
        name: 'cidade',
        type: 'STRING',
        description: 'Nome da cidade',
        required: true
      }
    ]
  },
  run: async (client, interaction) => {
    try {
      const city = interaction.options.getString('cidade');

      const request = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${normalize(
          city
        )}&lang=pt_br&units=metric&appid=${process.env.WEATHER_ID}
        `
      );

      const embed = new MessageEmbed()
        .setColor('#f8f8f8')
        .setThumbnail(
          `https://openweathermap.org/img/wn/${request.data.weather[0].icon}@${
            '4x' || '2x'
          }.png`
        )
        .setTitle(`Tempo em ${request.data.name}`)
        .addField('Clima', capitalize(request.data.weather[0].description))
        .addField('Temperatura', `${request.data.main.temp}°c`)
        .addField('Sensação', `${request.data.main.feels_like}°c`)
        .addField('Humidade', `${request.data.main.humidity}%`)
        .setFooter(
          `Requisitado por ${interaction.user.username}`,
          interaction.user.displayAvatarURL()
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      interaction.reply('Essa cidade não existe');
    }
  }
};
