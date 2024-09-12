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

async function getAllTeseDissertacao(req) {
    let {searchOrientador, searchAutor, searchAno, searchTitulo} = req.query;
    let whereClause = {tipo: req.params.tipo};
    if(searchOrientador) whereClause.orientador = { $regex: searchOrientador, $options: 'i' }
    if(searchAutor) whereClause.autor = { $regex: searchAutor, $options: 'i' }
    if(searchAno) whereClause.ano = { $regex: searchAno, $options: 'i' }
    if(searchTitulo) whereClause.titulo = { $regex: searchTitulo, $options: 'i' }

    const query = TeseDissertacaoModel
        .find(whereClause)
        .sort({
            ano: -1
        });

    const page = req && req.query && req.query.page ? parseInt(req.query.page) : 1; // Página atual, padrão é 1
    const limit = req && req.query && req.query.page ? parseInt(req.query.limit) : 10; // Limite de documentos por página, padrão é 10
    const skip = (page - 1) * limit;

    query.skip(skip).limit(limit+1);

    return await query.exec();
}

async function deleteTeseDissertacao(id) {
    return await TeseDissertacaoModel.findOneAndRemove({
        _id: id
    });
}

async function getFillTeseDissertacao(req) {
    let filtro
    let metadados = [];

    if (req.query.resumo) req.query.resumo = { $regex: req.query.resumo, $options: 'i' }
    if (req.query.ano) req.query.ano = { $regex: req.query.ano, $options: 'i' }
    if (req.query.autor) req.query.autor = { $regex: req.query.autor, $options: 'i' }
    if (req.query.orientador) req.query.orientador = { $regex: req.query.orientador, $options: 'i' }
    if (req.query.titulo) req.query.titulo = { $regex: req.query.titulo, $options: 'i' }
    if (req.query.ingresso) req.query.ingresso = { $regex: req.query.ingresso, $options: 'i' }
    if (req.query.dataSala) req.query.dataSala = { $regex: req.query.dataSala, $options: 'i' }
    if (req.query.banca) req.query.banca = { $regex: req.query.banca, $options: 'i' }
    if (req.query.metadados) {

        metadados = req.query.metadados.split(',')
        req.query['palavrasChave'] = { "$in": metadados }
    }

    const query = TeseDissertacaoModel.find(req.query)
        .sort({
            createAt: -1
        });

        
    const page = req && req.query && req.query.page ? parseInt(req.query.page) : 1; // Página atual, padrão é 1
    const limit = req && req.query && req.query.page ? parseInt(req.query.limit) : 10; // Limite de documentos por página, padrão é 10
    const skip = (page - 1) * limit;

    query.skip(skip).limit(limit+1);
    return await query.exec();
}