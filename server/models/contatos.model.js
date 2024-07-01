const mongoose = require('mongoose');

const ContatosSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    email: {
      type: String,
      required: true,
    },

    telefone: {
      type: String,
      required: true,
    },

    endereco: {
      type: String,
      required: true,
    },

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Contatos', ContatosSchema);
