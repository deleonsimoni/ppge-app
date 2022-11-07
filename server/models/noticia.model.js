const mongoose = require('mongoose');

const NoticiaSchema = new mongoose.Schema(
    {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
        },
    
        "pt-br": {
          navTitle: {
            type: String,
            required: true,
          },
      
          title: {
            type: String,
            required: true,
          },
      
          content: {
            type: String,
            required: true,
          },
    
        },
    
        "en-us": {
          navTitle: {
            type: String,
            required: true,
          },
      
          title: {
            type: String,
            required: true,
          },
      
          content: {
            type: String,
            required: true,
          },
    
        },
        
        "es-es": {
          navTitle: {
            type: String,
            required: true,
          },
      
          title: {
            type: String,
            required: true,
          },
      
          content: {
            type: String,
            required: true,
          },
    
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

module.exports = mongoose.model('Noticia', NoticiaSchema);
