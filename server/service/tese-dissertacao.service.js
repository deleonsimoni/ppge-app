const TeseDissertacaoModel = require("../models/tese-dissertacao.model");

module.exports = {
    insertTeseDissertacao,
    updateTeseDissertacao,
    deleteTeseDissertacao,
    getAllTeseDissertacao,
    getFillTeseDissertacao
};

async function insertTeseDissertacao(req, idUser) {
    let form = req.body.formulario;
    form.user = idUser;
    return await new TeseDissertacaoModel(form).save();
}

async function updateTeseDissertacao(req, idUser) {

    let form = req.body.formulario;
    form.user = idUser;
    return await TeseDissertacaoModel.findOneAndUpdate({
        _id: form._id
    },
        form, {
        upsert: true
    });

}

async function getAllTeseDissertacao(tipo) {
    return await TeseDissertacaoModel.find({tipo: tipo});
}

async function deleteTeseDissertacao(id) {
    return await TeseDissertacaoModel.findOneAndRemove({
        _id: id
    });
}

async function getFillTeseDissertacao(req) {
    return await TeseDissertacaoModel.find(req.query)
    .sort({
      createAt: -1
    });
}