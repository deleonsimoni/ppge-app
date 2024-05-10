const mongoose = require('mongoose');

const TeseDissertacaoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    pagina: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    ano: {
        type: String,
        required: true,
    },
    orientador: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    dataSala: {
        type: String,
        required: true,
    },
    banca: {
        type: String,

    },
    ingresso: {
        type: String,
        required: true,
    },
    ingresso: {
        type: String,
        required: true,
    },
    linkTitulo: {
        type: String,

    },
    palavrasChave: [
        {
            type: String,
        }
    ],
    resumo: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}
);
module.exports = mongoose.model('TeseDissertacao', TeseDissertacaoSchema);