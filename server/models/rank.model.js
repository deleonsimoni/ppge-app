const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema(
  {

    idProcesso: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'LinhaPesquisa',
    },

    type: {
      type: Number,
      required: true,
      default: 1
    },

    listRank: [
      {
        title: {
          type: String,
        },
        listRankLinha: {
          type: mongoose.Schema.Types.Mixed,

        },
        published: {
          type: Boolean,
          default: false,
        },
        isFinalRank: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      }
    ],

    updatedAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Rank', RankSchema);
