
const ProcessoSeletivoModel = require('../models/processo-seletivo.model');

module.exports = {
  getProcessoSeletivo,
  insertProcessoSeletivo,
  getInscritosByProcessoSelectivo,
  getMinhaInscricoesProcessoSelectivo,
  subscribeProcessoSeletivo,
  unsubscribeProcessoSeletivo,
  updateProcessoSeletivo,
  deleteProcessoSeletivo,
  atualizarProcessoSeletivoAtivo,
};



/* Processo Seletivo */

async function getProcessoSeletivo(req) {
  let whereClause = {};
  if(req.query.isAtivo != undefined) whereClause.isAtivo = req.query.isAtivo;
  return await ProcessoSeletivoModel.find(whereClause, {enrolled: 0})
    .sort({
      createAt: -1
    });
}

async function getInscritosByProcessoSelectivo(idProcessoSeletivo) {
  return await ProcessoSeletivoModel
    .findOne({_id: idProcessoSeletivo}, {enrolled: 1})
    .populate({path: 'enrolled', select: 'fullname socialname'})
    .sort({
      createAt: -1
    });

}

async function getMinhaInscricoesProcessoSelectivo(idUser) {
  return await ProcessoSeletivoModel
    .find({enrolled: idUser}, {_id: 1})
    .sort({
      createAt: -1
    });

}

async function insertProcessoSeletivo(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new ProcessoSeletivoModel(form).save();
}

async function atualizarProcessoSeletivoAtivo(req, idProcesso) {

  let isAtivo = req.body.isAtivo;
  return await ProcessoSeletivoModel.findOneAndUpdate(
    {_id: idProcesso},
    {isAtivo: !!isAtivo}, 
    {upsert: false}
  );
}

async function subscribeProcessoSeletivo(idProcessoSeletivo, idUser) {
  return await ProcessoSeletivoModel.findOneAndUpdate({
    _id: idProcessoSeletivo, isAtivo: true
  },
  {$addToSet: {enrolled: idUser}}, 
  {upsert: false}
  );
}

async function unsubscribeProcessoSeletivo(idProcessoSeletivo, idUser) {
  return await ProcessoSeletivoModel.findOneAndUpdate({
    _id: idProcessoSeletivo
  },
  {$pull: {enrolled: idUser}}, 
  {upsert: false}
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