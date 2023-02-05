const mongoose = require('mongoose');

const CotaAcaoAfirmativaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    title: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('CotaAcaoAfirmativa', CotaAcaoAfirmativaSchema);
