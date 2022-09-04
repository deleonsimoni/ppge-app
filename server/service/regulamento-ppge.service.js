const RegulamentoPpgeModel = require("../models/regulamento-ppge.model");

module.exports = {
  getRegulamentoPpge,
  insertRegulamentoPpge,
  updateRegulamentoPpge,
  deleteRegulamentoPpge,
};

async function getRegulamentoPpge(req) {
  let whereClause = {};
  if(!!req.query.language) whereClause.language = req.query.language
  return await RegulamentoPpgeModel.findOne(whereClause)
    .sort({
      createAt: -1
    });
}

async function updateRegulamentoPpge(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await RegulamentoPpgeModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });

}

async function insertRegulamentoPpge(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new RegulamentoPpgeModel(form).save();
}

async function deleteRegulamentoPpge(id) {
  return await RegulamentoPpgeModel.findOneAndRemove({
    _id: id
  });
}