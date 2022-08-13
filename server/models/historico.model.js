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

module.exports = mongoose.model('Historico', HistoricoSchema);
