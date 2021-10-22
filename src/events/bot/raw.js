module.exports = async (client, packet) => {
  client.manager.updateVoiceState(packet);
};
