const LinhaPesquisaModel = require("../models/linha-pesquisa.model");

module.exports = {
  getLinhaPesquisa,
  insertLinhaPesquisa,
  updateLinhaPesquisa,
  deleteLinhaPesquisa,
};

async function getLinhaPesquisa(req) {
  console.log('AAAAA: ', req.query)
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await LinhaPesquisaModel.findOne(whereClause)
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