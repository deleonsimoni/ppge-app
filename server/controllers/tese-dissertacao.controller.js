const teseDissertacaoService = require('../service/tese-dissertacao.service');

module.exports = {
    updateTeseDissertacao,
    insertTeseDissertacao,
    deleteTeseDissertacao,
    getAllTeseDissertacao,
    getFillTeseDissertacao
}

const functions = {
      getPerTipo: async (req) => await teseDissertacaoService.getAllTeseDissertacao(req),
      update: async (req, idUser) => await teseDissertacaoService.updateTeseDissertacao(req, idUser),
      insert: async (req, idUser) => await teseDissertacaoService.insertTeseDissertacao(req, idUser),
      delete: async (id) => await teseDissertacaoService.deleteTeseDissertacao(id),
      getFillTeseDissertacao: async (req) => await teseDissertacaoService.getFillTeseDissertacao(req),
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

async function getAllTeseDissertacao(req) {
  return functions.getPerTipo(req);
}

async function getFillTeseDissertacao(req) {
  return functions.getFillTeseDissertacao(req);
}

async function updateTeseDissertacao(req, idUser) {
  return functions.update(req, idUser);
}