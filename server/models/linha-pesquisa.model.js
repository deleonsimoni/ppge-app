const mongoose = require('mongoose');

const LinhaPesquisaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    navTitle: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },    
    
    corpoDocente: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CorpoDocente'
      }
    ],

    content: {
      type: String,
      required: true,
    },

    language: {
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

module.exports = mongoose.model('LinhaPesquisa', LinhaPesquisaSchema);
