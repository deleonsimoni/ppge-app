const mongoose = require('mongoose');

const CorpoDocenteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    fullName: {
      type: String,
      required: true,
    },

    academicFormation: {
      type: String,
      required: true,
    },

    researchLine: {
      type: String,
      required: true,
    },

    twitter: {
      type: String,
      required: false,
    },

    facebook: {
      type: String,
      required: false,
    },

    instagram: {
      type: String,
      required: false,
    },

    linkedin: {
      type: String,
      required: false,
    },

    type: {
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

module.exports = mongoose.model('CorpoDocente', CorpoDocenteSchema);