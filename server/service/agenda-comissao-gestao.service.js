const AgendaComissaoGestaoModel = require("../models/agenda-comissao-gestao.model");

module.exports = {
  getAgendaComissaoGestao,
  insertAgendaComissaoGestao,
  updateAgendaComissaoGestao,
  deleteAgendaComissaoGestao,
};

async function getAgendaComissaoGestao(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await AgendaComissaoGestaoModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateAgendaComissaoGestao(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await AgendaComissaoGestaoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertAgendaComissaoGestao(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new AgendaComissaoGestaoModel(form).save();
}

async function deleteAgendaComissaoGestao(id) {
  return await AgendaComissaoGestaoModel.findOneAndRemove({
    _id: id
  });
}