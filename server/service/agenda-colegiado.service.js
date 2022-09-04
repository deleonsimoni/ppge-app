const AgendaColegiadoModel = require("../models/agenda-colegiado.model");

module.exports = {
  getAgendaColegiado,
  insertAgendaColegiado,
  updateAgendaColegiado,
  deleteAgendaColegiado,
};

async function getAgendaColegiado(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await AgendaColegiadoModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateAgendaColegiado(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await AgendaColegiadoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertAgendaColegiado(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new AgendaColegiadoModel(form).save();
}

async function deleteAgendaColegiado(id) {
  return await AgendaColegiadoModel.findOneAndRemove({
    _id: id
  });
}