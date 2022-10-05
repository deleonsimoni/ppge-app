const mongoose = require('mongoose');

const ProcessoSeletivoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    isAtivo: {
      type: Boolean,
      default: true
    },

    type: {
      type: Number,
      required: true,
      default: 1
    },
    
    researchLine: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LinhaPesquisa',
      }
    ],

    title: {
      type: String,
      required: true,
    },

    content: [
      {
        contentTitle: {
          type: String,
        },
        contentLink: {
          type: String,
        }
      }
    ],

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
