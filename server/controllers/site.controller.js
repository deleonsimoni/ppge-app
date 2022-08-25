const HistoricoModel = require('../models/historico.model');
const S3Uploader = require('./aws.controller');


module.exports = {
  getHistorico,
  insertHistorico,
  updateHistorico,
  deleteHistorico,
};

async function getHistorico() {
  return await HistoricoModel.find()
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
