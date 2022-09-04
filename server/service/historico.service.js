const HistoricoModel = require("../models/historico.model");

module.exports = {
  getHistorico,
  insertHistorico,
  updateHistorico,
  deleteHistorico,
};

async function getHistorico(req) {
  console.log('getHistorico: ', req.query._id);
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  if(!!req.query._id) whereClause._id = req.query._id
  console.log('getHistorico, whereClause: ', whereClause);
  return await HistoricoModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateHistorico(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await HistoricoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertHistorico(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new HistoricoModel(form).save();
}

async function deleteHistorico(id) {
  return await HistoricoModel.findOneAndRemove({
    _id: id
  });
}