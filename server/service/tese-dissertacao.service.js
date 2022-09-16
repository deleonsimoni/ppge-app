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
    console.log('getDissertacao: ', req.query.autor);
    let whereClause = {};
    if(!!req.query.tipo) whereClause.tipo = req.query.tipo
    if(!!req.query.ano) whereClause.ano = req.query.ano
    if(!!req.query.autor) whereClause.autor = req.query.autor
    if(!!req.query.titulo) whereClause.titulo = req.query.titulo
    if(!!req.query.dataSala) whereClause.dataSala = req.query.dataSala
    if(!!req.query.banca) whereClause.banca = req.query.banca
    if(!!req.query.ingresso) whereClause.ingresso = req.query.ingresso

    console.log('query aqui ------>: ', whereClause);
    return await TeseDissertacaoModel.find(whereClause)
    .sort({
      createAt: -1
    });
}