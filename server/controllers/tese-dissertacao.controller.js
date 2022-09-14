const teseDissertacaoService = require('../service/tese-dissertacao.service');

module.exports = {
    updateTeseDissertacao,
    insertTeseDissertacao,
    deleteTeseDissertacao,
    getAllTeseDissertacao
}

const functions = {
      getPerTipo: async (tipo) => await teseDissertacaoService.getAllTeseDissertacao(tipo),
      update: async (req, idUser) => await teseDissertacaoService.updateTeseDissertacao(req, idUser),
      insert: async (req, idUser) => await teseDissertacaoService.insertTeseDissertacao(req, idUser),
      delete: async (id) => await teseDissertacaoService.deleteTeseDissertacao(id),
}

async function updateTeseDissertacao(req, idUser) {
  return functions[req.params.selectedPage].update(req, idUser);
}
  
async function insertTeseDissertacao(req, idUser) {
  return functions.insert(req, idUser);
}
  
async function deleteTeseDissertacao(req, id) {
  return functions.delete(id);
}

async function getAllTeseDissertacao(tipo) {
  return functions.getPerTipo(tipo);
}

async function updateTeseDissertacao(req, idUser) {
  return functions.update(req, idUser);
}