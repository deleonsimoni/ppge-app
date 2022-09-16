
const ProcessoSeletivoModel = require('../models/processo-seletivo.model');

module.exports = {
  getProcessoSeletivo,
  insertProcessoSeletivo,
  getInscritosByProcessoSelectivo,
  subscribeProcessoSeletivo,
  unsubscribeProcessoSeletivo,
  updateProcessoSeletivo,
  deleteProcessoSeletivo,
};



/* Processo Seletivo */

async function getProcessoSeletivo(req) {
  return await ProcessoSeletivoModel.find({}, {enrolled: 0})
    .sort({
      createAt: -1
    });

}

async function getInscritosByProcessoSelectivo(idProcessoSeletivo) {
  return await ProcessoSeletivoModel.findOne({_id: idProcessoSeletivo}, {enrolled: 1})
    .sort({
      createAt: -1
    });

}

async function insertProcessoSeletivo(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new ProcessoSeletivoModel(form).save();
}

async function subscribeProcessoSeletivo(idProcessoSeletivo, idUser) {
  return await ProcessoSeletivoModel.findOneAndUpdate({
    _id: idProcessoSeletivo
  },
  {$addToSet: {enrolled: idUser}}, 
  {upsert: true}
  );
}

async function unsubscribeProcessoSeletivo(idProcessoSeletivo, idUser) {
  return await ProcessoSeletivoModel.findOneAndUpdate({
    _id: idProcessoSeletivo
  },
  {$pull: {enrolled: idUser}}, 
  {upsert: true}
  );
}

async function updateProcessoSeletivo(req, idUser) {

  let form = req.body.formulario;
  form.user = idUser;
  return await ProcessoSeletivoModel.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });
}

async function deleteProcessoSeletivo(id) {
  return await ProcessoSeletivoModel.findOneAndRemove({
    _id: id
  });
}

/* Fim Processo Seletivo */