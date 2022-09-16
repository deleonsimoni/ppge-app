const mongoose = require('mongoose');

const ProcessoSeletivoSchema = new mongoose.Schema(
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

    enrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    }

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('ProcessoSeletivo', ProcessoSeletivoSchema);
