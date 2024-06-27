const mongoose = require('mongoose');

const HomeApresentacaoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    "pt-br": {
      content: {
        type: String,
        required: true,
      },

    },

    "en-us": {
      content: {
        type: String,
        required: true,
      },

    },
    
    "es-es": {
      content: {
        type: String,
        required: true,
      },

    },

    createdAt: {
      type: Date,
      default: Date.now,
    }

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('HomeApresentacao', HomeApresentacaoSchema);
