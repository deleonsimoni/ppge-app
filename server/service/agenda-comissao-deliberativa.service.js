const AgendaComissaoDeliberativaModel = require("../models/agenda-comissao-deliberativa.model");

module.exports = {
  getAgendaComissaoDeliberativa,
  insertAgendaComissaoDeliberativa,
  updateAgendaComissaoDeliberativa,
  deleteAgendaComissaoDeliberativa,
};

async function getAgendaComissaoDeliberativa(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await AgendaComissaoDeliberativaModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateAgendaComissaoDeliberativa(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await AgendaComissaoDeliberativaModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertAgendaComissaoDeliberativa(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new AgendaComissaoDeliberativaModel(form).save();
}

async function deleteAgendaComissaoDeliberativa(id) {
  return await AgendaComissaoDeliberativaModel.findOneAndRemove({
    _id: id
  });
}