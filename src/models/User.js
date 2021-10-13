const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    id: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
    _id: false
  }
);

module.exports = model('User', schema);
