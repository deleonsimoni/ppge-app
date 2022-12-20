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
    return await TeseDissertacaoModel.find({ tipo: tipo });
}

async function deleteTeseDissertacao(id) {
    return await TeseDissertacaoModel.findOneAndRemove({
        _id: id
    });
}

async function getFillTeseDissertacao(req) {

    let metadados = [];

    if (req.query.ano) req.query.ano = { $regex: req.query.ano, $options: 'i' }
    if (req.query.ingresso) req.query.ingresso = { $regex: req.query.ingresso, $options: 'i' }
    if (req.query.autor) req.query.autor = { $regex: req.query.autor, $options: 'i' }
    if (req.query.titulo) req.query.titulo = { $regex: req.query.titulo, $options: 'i' }
    if (req.query.dataSala) req.query.dataSala = { $regex: req.query.dataSala, $options: 'i' }
    if (req.query.banca) req.query.banca = { $regex: req.query.banca, $options: 'i' }
    if (req.query.metadados) {

        metadados = req.query.metadados.split(',')
        req.query['palavrasChave'] = { "$in": metadados }
    }

    return await TeseDissertacaoModel.find(req.query)
        .sort({
            createAt: -1
        });
}