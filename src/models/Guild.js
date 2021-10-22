const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    prefix: String,
    welcomeChannel: String,
    goodbyeChannel: String
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = model('Guild', schema);
