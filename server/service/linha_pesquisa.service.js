const { default: mongoose } = require("mongoose");
const LinhaPesquisaModel = require("../models/linha-pesquisa.model");

module.exports = {
  getLinhaPesquisa,
  getHeadersLinhaPesquisa,
  insertLinhaPesquisa,
  updateLinhaPesquisa,
  deleteLinhaPesquisa,
};

async function getLinhaPesquisa(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  if(!!req.query._id) {
    if(!mongoose.Types.ObjectId.isValid(req.query._id)) return [];
    whereClause._id = req.query._id
  }
  return await LinhaPesquisaModel.find(whereClause)
    .sort({
      createAt: -1
    });
}

async function getHeadersLinhaPesquisa(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await LinhaPesquisaModel.find(whereClause, {navTitle: 1})
    .sort({
      createAt: -1
    });
}

async function updateLinhaPesquisa(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await LinhaPesquisaModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertLinhaPesquisa(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new LinhaPesquisaModel(form).save();
}

async function deleteLinhaPesquisa(id) {
  return await LinhaPesquisaModel.findOneAndRemove({
    _id: id
  });
}