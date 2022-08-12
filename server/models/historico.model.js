const mongoose = require('mongoose');

const HistoricoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    imagePathS3: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    roles: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Historico', HistoricoSchema);
