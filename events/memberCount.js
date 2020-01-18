const config = require("../config.json");

module.exports = [
    //  {
    //      name: 'guildMemberAdd',
    //      run: (client, member) => {
    //          var numbertowords = require('number-to-words');
    //          var membersCount = `${client.guilds.get(config.guildID).memberCount}`;
    //          var membersArray = new Array();
    //          var membersSplit = membersCount.split("");
    //          var counter = "";
         
    //          for (var i = 0; i < membersCount.length; i++) {
    //              membersArray[i] = numbertowords.toWords(membersSplit[i]);
    //              counter += ':' + membersArray[i] + ': ';
    //          }
         
    //          const channel = client.channels.get(config.channel.chatChannel);
    //          channel.setTopic(`Temos atualmente ${counter} membros`)
    //      }
    //  }, {
    //      name: 'guildMemberRemove',
    //      run: (client, member) => {
    //          var numbertowords = require('number-to-words');
    //          var membersCount = `${client.guilds.get(config.guildID).memberCount}`;
    //          var membersArray = new Array();
    //          var membersSplit = membersCount.split("");
    //          var counter = "";
         
    //         for (var i = 0; i < membersCount.length; i++) {
    //              membersArray[i] = numbertowords.toWords(membersSplit[i]);
    //              counter += ':' + membersArray[i] + ': ';
    //          }
         
    //          const channel = client.channels.get(config.channel.chatChannel);
    //          channel.setTopic(`Temos atualmente ${counter} membros`)
    //      }
    //  }
];
