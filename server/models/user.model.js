const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    socialname: {
      type: String
    },
    cpf: {
      type: String,
      required: true,
    },
    rg: {
      type: String,
      required: true,
    },
    rgEmissor: {
      type: String,
      required: true,
    },
    passaporte: {
      type: String
    },
    dataNiver: {
      type: Date,
    },
    nacionalidade: {
      type: String
    },
    endereco: {
      type: String
    },
    bairro: {
      type: String
    },
    cep: {
      type: String
    },
    cidade: {
      type: String
    },
    estado: {
      type: String
    },
    celular: {
      type: String
    },
    telefone: {
      type: String
    },
    cargo: {
      type: String
    },
    empresa: {
      type: String
    },
    deficiencia: {
      type: String
    },
    cor: {
      type: String
    },
    genero: {
      type: String
    },
    hashedPassword: {
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

module.exports = mongoose.model('User', UserSchema);
