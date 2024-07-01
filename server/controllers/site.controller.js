const agendaColegiadoService = require('../service/agenda-colegiado.service');
const agendaComissaoDeliberativaService = require('../service/agenda-comissao-deliberativa.service');
const agendaComissaoGestao = require('../service/agenda-comissao-gestao.service');
const comissaoDeliberativaService = require('../service/comissao-deliberativa.service');
const comissaoGestaoService = require('../service/comissao-gestao.service');
const historicoService = require('../service/historico.service');
const contatosService = require('../service/contatos.service');
const normasPosDoutoradoService = require('../service/normas-pos-doutorado.service');
const objetivoService = require('../service/objetivo.service');
const noticiaService = require('../service/noticias.service');
const revistaService = require('../service/revistas.service');
const iaCalendarioService = require('../service/ia-calendario.service');
const iaHorarioPeriodoService = require('../service/ia-horario-periodo.service');
const iaMatriculaService = require('../service/ia-matricula.service');
const iaFormulariosService = require('../service/ia-formularios.service');
const homeApresentacaoService = require('../service/home-apresentacao.service');

const regrasCredenciamentoService = require('../service/regras-credenciamento.service');
const regulamentoPpgeService = require('../service/regulamento-ppge.service');
const linhaPesquisaService = require('../service/linha_pesquisa.service');
const cursosService = require('../service/cursos.service');
const S3Uploader = require('./aws.controller');
const CorpoDocenteModel = require('../models/corpo-docente.model');
const Noticia = require('../models/noticia.model');

module.exports = {
  getPage,
  getHeadersPage,
  getHeadersPaginationPage,
  getAllTitlesPage,
  insertPage,
  updatePage,
  deletePage,

  getCorpoDocente,
  getCorpoDocenteName,
  insertCorpoDocente,
  updateCorpoDocente,
  deleteCorpoDocente,

  getNoticia,
  getNoticiaCarrossel,
  insertNoticia,
  deleteNoticia,
  updateNoticia,

  getHeadersLinhaPesquisaWithProfessors,
};



const pagesFunctions = {
  contatos: {
    get: async (req) => await contatosService.getContatos(req),
    update: async (req, idUser) => await contatosService.updateContatos(req, idUser),
    insert: async (req, idUser) => await contatosService.insertContatos(req, idUser),
  },
  historico: {
    get: async (req) => await historicoService.getHistorico(req),
    update: async (req, idUser) => await historicoService.updateHistorico(req, idUser),
    insert: async (req, idUser) => await historicoService.insertHistorico(req, idUser),
    delete: async (id) => await historicoService.deleteHistorico(id),
  },
  normas_pos_doutorado: {
    get: async (req) => await normasPosDoutoradoService.getNormasPosDoutorado(req),
    update: async (req, idUser) => await normasPosDoutoradoService.updateNormasPosDoutorado(req, idUser),
    insert: async (req, idUser) => await normasPosDoutoradoService.insertNormasPosDoutorado(req, idUser),
    delete: async (id) => await normasPosDoutoradoService.deleteNormasPosDoutorado(id),
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
    getHeaders: async (req) => await linhaPesquisaService.getHeadersLinhaPesquisa(req),
    getAllTitles: async (req) => await linhaPesquisaService.getAllTitlesLinhaPesquisa(req),
    update: async (req, idUser) => await linhaPesquisaService.updateLinhaPesquisa(req, idUser),
    insert: async (req, idUser) => await linhaPesquisaService.insertLinhaPesquisa(req, idUser),
    delete: async (id) => await linhaPesquisaService.deleteLinhaPesquisa(id),

  },
  cursos: {
    get: async (req) => await cursosService.getCursos(req),
    getHeaders: async (req) => await cursosService.getHeadersCursos(req),
    update: async (req, idUser) => await cursosService.updateCursos(req, idUser),
    insert: async (req, idUser) => await cursosService.insertCursos(req, idUser),
    delete: async (id) => await cursosService.deleteCursos(id),

  },
  noticias: {
    get: async (req) => await noticiaService.getNoticias(req),
    getHeaders: async (req) => await noticiaService.getHeadersNoticias(req),
    getHeadersPagination: async (req) => await noticiaService.getHeadersPaginationNoticias(req),
    update: async (req, idUser) => await noticiaService.updateNoticia(req, idUser),
    insert: async (req, idUser) => await noticiaService.insertNoticia(req, idUser),
    delete: async (id) => await noticiaService.deleteNoticia(id),
  },
  revistas: {
    get: async (req) => await revistaService.getRevistas(req),
    getHeaders: async (req) => await revistaService.getHeadersRevistas(req),
    update: async (req, idUser) => await revistaService.updateRevistas(req, idUser),
    insert: async (req, idUser) => await revistaService.insertRevistas(req, idUser),
    delete: async (id) => await revistaService.deleteRevistas(id),
  },
  ia_calendario: {
    get: async (req) => await iaCalendarioService.getIACalendario(req),
    update: async (req, idUser) => await iaCalendarioService.updateIACalendario(req, idUser),
    insert: async (req, idUser) => await iaCalendarioService.insertIACalendario(req, idUser),
    delete: async (id) => await iaCalendarioService.deleteIACalendario(id),
  },
  ia_horario_periodo: {
    get: async (req) => await iaHorarioPeriodoService.getIAHorarioPeriodo(req),
    update: async (req, idUser) => await iaHorarioPeriodoService.updateIAHorarioPeriodo(req, idUser),
    insert: async (req, idUser) => await iaHorarioPeriodoService.insertIAHorarioPeriodo(req, idUser),
    delete: async (id) => await iaHorarioPeriodoService.deleteIAHorarioPeriodo(id),
  },
  ia_matricula: {
    get: async (req) => await iaMatriculaService.getIAMatricula(req),
    update: async (req, idUser) => await iaMatriculaService.updateIAMatricula(req, idUser),
    insert: async (req, idUser) => await iaMatriculaService.insertIAMatricula(req, idUser),
    delete: async (id) => await iaMatriculaService.deleteIAMatricula(id),
  },
  ia_formularios: {
    get: async (req) => await iaFormulariosService.getIAFormularios(req),
    update: async (req, idUser) => await iaFormulariosService.updateIAFormularios(req, idUser),
    insert: async (req, idUser) => await iaFormulariosService.insertIAFormularios(req, idUser),
    delete: async (id) => await iaFormulariosService.deleteIAFormularios(id),
  },
  home_apresentacao: {
    get: async (req) => await homeApresentacaoService.getHomeApresentacao(req),
    update: async (req, idUser) => await homeApresentacaoService.updateHomeApresentacao(req, idUser),
    insert: async (req, idUser) => await homeApresentacaoService.insertHomeApresentacao(req, idUser),
    delete: async (id) => await homeApresentacaoService.deleteHomeApresentacao(id),
  },
}

/* Linha de pesquisa */
async function getHeadersLinhaPesquisaWithProfessors(req) {
  return await linhaPesquisaService.getHeadersLinhaPesquisaWithProfessors(req)
}
/* Fim linha pesquisa */

/* Page */
async function getPage(req) {
  return pagesFunctions[req.params.selectedPage].get(req);
}

async function getHeadersPage(req) {
  return pagesFunctions[req.params.selectedPage].getHeaders(req);
}

async function getHeadersPaginationPage(req) {
  return pagesFunctions[req.params.selectedPage].getHeadersPagination(req);
}

async function getAllTitlesPage(req) {
  return pagesFunctions[req.params.selectedPage].getAllTitles(req);
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

async function getNoticia() {
  return await Noticia.find()
    .sort({
      createAt: -1
    });
}

async function getNoticiaCarrossel() {
  return await Noticia.find({ isCarrossel: true })
    .sort({
      ordem: 1
    });
}

async function insertNoticia(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/news/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;
      return await new Noticia(form).save();
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await new Noticia(form).save();
  }
}


async function deleteNoticia(id) {
  return await Noticia.findOneAndRemove({
    _id: id
  });
}

async function updateNoticia(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/news/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;

      return await Noticia.findOneAndUpdate({
        _id: form._id
      },
        form, {
        upsert: true
      });
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await Noticia.findOneAndUpdate({
      _id: form._id
    },
      form, {
      upsert: true
    });
  }

}


/* Corpo Docente */
async function getCorpoDocente(req) {
  let whereParam = {};
  if (req.query.type) whereParam.type = req.query.type
  let ret = await CorpoDocenteModel
    .find(whereParam)
    .populate({
      path: "listLinhaPesquisa",
      select: {
        [`${req.query.language}.title`]: 1
      }
    })
    .sort({
      fullName: 1
    });

  ret = ret.map(data => (
    {
      _id: data._id,
      fullName: data.fullName,
      imagePathS3: data.imagePathS3,
      academicFormation: data.academicFormation,
      twitter: data.twitter,
      facebook: data.facebook,
      instagram: data.instagram,
      linkedin: data.linkedin,
      lattes: data.lattes,
      type: data.type,
      linhaPesquisa: data.listLinhaPesquisa.map(dataLinha => (dataLinha[req.query.language].title)),
    }
  ))

  return ret
}

async function getCorpoDocenteName(req) {
  return await CorpoDocenteModel.find({}, { fullName: 1, type: 1 })
    .sort({
      createAt: -1
    });
}

async function updateCorpoDocente(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/corpo-docente/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = "https://ppge-public.s3.sa-east-1.amazonaws.com/"+fileName;
      retorno.temErro = false;

      return await CorpoDocenteModel.findOneAndUpdate({
        _id: form._id
      },
        form, {
        upsert: true
      });
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await CorpoDocenteModel.findOneAndUpdate({
      _id: form._id
    },
      form, {
      upsert: true
    });
  }

}

async function insertCorpoDocente(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/corpo-docente/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = "https://ppge-public.s3.sa-east-1.amazonaws.com/"+fileName;
      retorno.temErro = false;
      return await new CorpoDocenteModel(form).save();
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await new CorpoDocenteModel(form).save();
  }
}

async function deleteCorpoDocente(id) {
  return await CorpoDocenteModel.findOneAndRemove({
    _id: id
  });
}
/* Fim Page*/

