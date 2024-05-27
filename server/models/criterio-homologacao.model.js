const mongoose = require('mongoose');

const CriterioHomologacaoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    title: {
      type: String,
      required: true,
    },

    questions: [
      {
        type: String,
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    }

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('CriterioHomologacao', CriterioHomologacaoSchema);
