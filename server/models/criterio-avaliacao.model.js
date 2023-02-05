const mongoose = require('mongoose');

const CriterioAvaliacaoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    title: {
      type: String,
      required: true,
    },

    step: [
      {
        title: {
          type: String,
        },
        section: [
          {
            title: {
              type: String,
            },
            question: [
              {
                text: {
                  type: String,
                },
                maxNota: {
                  type: Number
                },
              }
            ]
            
          }
        ],
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

module.exports = mongoose.model('CriterioAvaliacao', CriterioAvaliacaoSchema);
