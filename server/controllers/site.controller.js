const agendaColegiadoService = require('../service/agenda-colegiado.service');
const agendaComissaoDeliberativaService = require('../service/agenda-comissao-deliberativa.service');
const agendaComissaoGestao = require('../service/agenda-comissao-gestao.service');
const comissaoDeliberativaService = require('../service/comissao-deliberativa.service');
const comissaoGestaoService = require('../service/comissao-gestao.service');
const historicoService = require('../service/historico.service');
const objetivoService = require('../service/objetivo.service');
const regrasCredenciamentoService = require('../service/regras-credenciamento.service');
const regulamentoPpgeService = require('../service/regulamento-ppge.service');
const linhaPesquisaService = require('../service/linha_pesquisa.service');
const S3Uploader = require('./aws.controller');
const HistoricoModel = require('../models/historico.model');
const ObjetivosModel = require('../models/objetivos.model');
const ComissaoDeliberativaModel = require('../models/comissao-deliberativa.model');
const ComissaoGestaoModel = require('../models/comissao-gestao.model');
const AgendaColegiadoModel = require('../models/agenda-colegiado.model');
const AgendaComissaoDeliberativaModel = require('../models/agenda-comissao-deliberativa.model');
const AgendaComissaoGestaoModel = require('../models/agenda-comissao-gestao.model');


module.exports = {
  getPage,
  insertPage,
  updatePage,
  deletePage,
};

const pagesFunctions = {
  historico: {
    get: async (req) => await historicoService.getHistorico(req),
    update: async (req, idUser) => await historicoService.updateHistorico(req, idUser),
    insert: async (req, idUser) => await historicoService.insertHistorico(req, idUser),
    delete: async (id) => await historicoService.deleteHistorico(id),
  },
  objetivo: {
    get: async (req) => await objetivoService.getObjetivo(req),
    update: async (req, idUser) => await objetivoService.updateObjetivo(req, idUser),
    insert: async (req, idUser) => await objetivoService.insertObjetivo(req, idUser),
    delete: async (id) => await objetivoService.deleteObjetivo(id),
  },
  comissao_deliberativa: {
    get: async (req) => await comissaoDeliberativaService.getComissaoDeliberativa(req),
    update: async (req, idUser) => await comissaoDeliberativaService.updateComissaoDeliberativa(req, idUser),
    insert: async (req, idUser) => await comissaoDeliberativaService.insertComissaoDeliberativa(req, idUser),
    delete: async (id) => await comissaoDeliberativaService.deleteComissaoDeliberativa(id),
  },
  comissao_gestao: {
    get: async (req) => await comissaoGestaoService.getComissaoGestao(req),
    update: async (req, idUser) => await comissaoGestaoService.updateComissaoGestao(req, idUser),
    insert: async (req, idUser) => await comissaoGestaoService.insertComissaoGestao(req, idUser),
    delete: async (id) => await comissaoGestaoService.deleteComissaoGestao(id),
  },
  agenda_colegiado: {
    get: async (req) => await agendaColegiadoService.getAgendaColegiado(req),
    update: async (req, idUser) => await agendaColegiadoService.updateAgendaColegiado(req, idUser),
    insert: async (req, idUser) => await agendaColegiadoService.insertAgendaColegiado(req, idUser),
    delete: async (id) => await agendaColegiadoService.deleteAgendaColegiado(id),
  },
  agenda_comissao_deliberativa: {
    get: async (req) => await agendaComissaoDeliberativaService.getAgendaComissaoDeliberativa(req),
    update: async (req, idUser) => await agendaComissaoDeliberativaService.updateAgendaComissaoDeliberativa(req, idUser),
    insert: async (req, idUser) => await agendaComissaoDeliberativaService.insertAgendaComissaoDeliberativa(req, idUser),
    delete: async (id) => await agendaComissaoDeliberativaService.deleteAgendaComissaoDeliberativa(id),
  },
  agenda_comissao_gestao: {
    get: async (req) => await agendaComissaoGestao.getAgendaComissaoGestao(req),
    update: async (req, idUser) => await agendaComissaoGestao.updateAgendaComissaoGestao(req, idUser),
    insert: async (req, idUser) => await agendaComissaoGestao.insertAgendaComissaoGestao(req, idUser),
    delete: async (id) => await agendaComissaoGestao.deleteAgendaComissaoGestao(id),
  },
  regulamento_ppge: {
    get: async (req) => await regulamentoPpgeService.getRegulamentoPpge(req),
    update: async (req, idUser) => await regulamentoPpgeService.updateRegulamentoPpge(req, idUser),
    insert: async (req, idUser) => await regulamentoPpgeService.insertRegulamentoPpge(req, idUser),
    delete: async (id) => await regulamentoPpgeService.deleteRegulamentoPpge(id),
  },
  regras_credenciamento: {
    get: async (req) => await regrasCredenciamentoService.getRegrasCredenciamento(req),
    update: async (req, idUser) => await regrasCredenciamentoService.updateRegrasCredenciamento(req, idUser),
    insert: async (req, idUser) => await regrasCredenciamentoService.insertRegrasCredenciamento(req, idUser),
    delete: async (id) => await regrasCredenciamentoService.deleteRegrasCredenciamento(id),
  },
  linha_pesquisa: {
    get: async (req) => await linhaPesquisaService.getLinhaPesquisa(req),
    update: async (req, idUser) => await linhaPesquisaService.updateLinhaPesquisa(req, idUser),
    insert: async (req, idUser) => await linhaPesquisaService.insertLinhaPesquisa(req, idUser),
    delete: async (id) => await linhaPesquisaService.deleteLinhaPesquisa(id),
  },
}



/* Page */
async function getPage(req) {
  return pagesFunctions[req.params.selectedPage].get(req);
}

async function updatePage(req, idUser) {
  return pagesFunctions[req.params.selectedPage].update(req, idUser);
}


async function insertPage(req, idUser) {
  return pagesFunctions[req.params.selectedPage].insert(req, idUser);
}

async function deletePage(req, id) {
  return pagesFunctions[req.params.selectedPage].delete(id);
}
/* Fim Page*/


