
const ProcessoSeletivoModel = require('../models/processo-seletivo.model');
const UserController = require('./user.controller')
const S3Uploader = require('./aws.controller');
const { getErrorByStatus, getSuccessByStatus } = require('../service/error.service');
const { default: mongoose } = require('mongoose');
const templateEmail = require('../config/templateEmails');
const emailSender = require('../controllers/email.controller');

const MESTRADO = 1, DOUTORADO = 2;

module.exports = {
  getProcessoSeletivo,
  insertProcessoSeletivo,
  getInscritosByProcessoSelectivo,
  getMinhaInscricoesProcessoSelectivo,
  getMinhaInscricoesDetalhadaProcessoSelectivo,
  subscribePerfilCandidato,
  subscribeProcessoSeletivo,
  unsubscribeProcessoSeletivo,
  updateProcessoSeletivo,
  deleteProcessoSeletivo,
  atualizarProcessoSeletivoAtivo,
  getProcessoSeletivoInscreverInfosById,
  getUserInscricaoProcessoSeletivo,
  getProcessoSeletivoHeaders,
  vincularParecerista,
  getParecerByUser,
  registrarParecer,
  getAllParecer,
  getParecer,
  inscricaoJustificar,
  inscricaoJustificarHomolog,
  mudarEtapa,
  mudarEtapaAvaliacao,
  salvarVinculoCriterio,
  salvarVinculoCriterioHomologacao,
  changeHomologInscricao,
  changeHomologInscricaoV2,
  getHomologacaoV2,
  consolidarAvaliacao,
  consolidarAvaliacaoAutomatico,
};



/* Processo Seletivo */

async function consolidarAvaliacaoAutomatico(idProcesso, idInscricao) {
  try {
    let setUpdate = {};
    let processoInscricao = await ProcessoSeletivoModel.findOne(
      { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } }, 
      {criterio: 1, 'enrolled.$': 1}
    );

    let avaliacoes = processoInscricao.enrolled[0].parecer.avaliacoes
    let avaliadores = processoInscricao.enrolled[0].parecerista
    processoInscricao.criterio.step.forEach(step => {
      let notaEtapa = 0;
      let primeiroAvaliador = avaliacoes[`avaliador-${avaliadores.primeiro}`]
      let segundoAvaliador = avaliacoes[`avaliador-${avaliadores.segundo}`]
      if(primeiroAvaliador) {
        notaEtapa = preciseSum(notaEtapa, primeiroAvaliador?.step[`step-${step._id}`]?.totalNotaEtapa ? primeiroAvaliador?.step[`step-${step._id}`]?.totalNotaEtapa : 0)
      }
      if(segundoAvaliador) {
        notaEtapa = preciseSum(notaEtapa, segundoAvaliador?.step[`step-${step._id}`]?.totalNotaEtapa ? segundoAvaliador?.step[`step-${step._id}`]?.totalNotaEtapa : 0)
      }

      // let keysAvaliacoes = Object.keys(avaliacoes);
      // keysAvaliacoes.forEach(ava => {
      //   notaEtapa = preciseSum(notaEtapa, avaliacoes[ava]?.step[`step-${step._id}`]?.totalNotaEtapa ? avaliacoes[ava]?.step[`step-${step._id}`]?.totalNotaEtapa : 0)
      // })
      let mediaEtapaAvaliadores = notaEtapa / 2;
      setUpdate[`enrolled.$.parecer.step.step-${step._id}.mediaStep`] = mediaEtapaAvaliadores;
      setUpdate[`enrolled.$.parecer.step.step-${step._id}.stepApproval`] = mediaEtapaAvaliadores >= 7;
    })


    let processo = await ProcessoSeletivoModel
      .findOneAndUpdate(
        { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
        { $set: setUpdate },
        { upsert: false }
      );

    if (processo)
      return getSuccessByStatus(200, "Etapa consolidada com sucesso!");
    else
      return getErrorByStatus(404, "Processo ou inscrição não encontrado na base!")
  } catch (error) {
    console.log("ERROR> ", error)
    return getErrorByStatus(500)

  }

}
  
function preciseSum(...values) {
  const sum = values.reduce((acc, val) => acc + Math.round(val * 100), 0);
  return sum / 100;
}

async function consolidarAvaliacao(idProcesso, idInscricao, body) {
  try {
    let processo = await ProcessoSeletivoModel
      .findOneAndUpdate(
        { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
        { $set: { 
          [`enrolled.$.parecer.step.step-${body.idStep}.mediaStep`]: body.mediaStep,
          [`enrolled.$.parecer.step.step-${body.idStep}.stepApproval`]: body.isApproveStep,
        } },
        { upsert: false }
      );

    if (processo)
      return getSuccessByStatus(200, "Etapa consolidada com sucesso!");
    else
      return getErrorByStatus(404, "Processo ou inscrição não encontrado na base!")
  } catch (error) {
    console.log("ERROR> ", error)
    return getErrorByStatus(500)

  }

}

async function vincularParecerista(body) {
  try {
    let processo = await ProcessoSeletivoModel
      .findOneAndUpdate(
        { _id: body.idProcesso, enrolled: { $elemMatch: { _id: body.idInscricao } } },
        { $set: { 
          "enrolled.$.parecerista.primeiro": body.pareceristas.primeiro,
          "enrolled.$.parecerista.segundo": body.pareceristas.segundo,
          "enrolled.$.responsavelHomologacao": body.pareceristas.responsavelHomologacao,
        } },
        { upsert: false }
      );

    if (processo) {
      let primeiro = UserController.getById(body.pareceristas.primeiro);
      let segundo = UserController.getById(body.pareceristas.segundo);
      
      let email = templateEmail.vinculoPareceristaProcessoSeletivo;
      emailSender.sendMailAWS(primeiro.email, 'Processo Seletivo', email);
      emailSender.sendMailAWS(segundo.email, 'Processo Seletivo', email);

      return getSuccessByStatus(200, "Avaliadores vinculados com sucesso!");
    }
    else
      return getErrorByStatus(404, "Processo ou inscrição não encontrado na base!")
  } catch (error) {
    console.log("ERROR> ", error)
    return getErrorByStatus(500)

  }
}

async function getUserInscricaoProcessoSeletivo(idUser, req) {
  return await ProcessoSeletivoModel
    .findOne(
      { _id: req.query.idProcesso },
      {
        _id: 1,
        enrolled: {
          $elemMatch: { idUser }
        }
      }
    )
    .populate({
      path: "enrolled.idUser",
      select: "fullname email socialname cpf rg rgEmissor passaporte dataNiver nacionalidade endereco bairro cep cidade estado celular telefone cargo empresa deficiencia cor genero",
    })
    .populate({
      path: "enrolled.primeiroOrientador",
      select: "fullName",
    })
    .populate({
      path: "enrolled.segundoOrientador",
      select: "fullName",
    })
    .populate({
      path: "enrolled.linhaPesquisa",
      select: `${req.query.language}.title`,
    });
}

async function getParecerByUser(req) {
  //req.query.idProcesso, req.query.idInscricao
  return await ProcessoSeletivoModel
    .findOne(
      { _id: req.query.idProcesso },
      {
        enrolled: {
          $elemMatch: { _id: req.query.idInscricao }
        }
      }
    )
    .populate({
      path: "enrolled.primeiroOrientador",
      select: "fullName",
    })
    .populate({
      path: "enrolled.segundoOrientador",
      select: "fullName",
    })
    .populate({
      path: "enrolled.linhaPesquisa",
      select: `${req.query.language}.title`,
    });
}

async function getAllParecer(req) {
  let result = await ProcessoSeletivoModel
    .findOne(
      { _id: req.query.idProcesso },
      {
        'enrolled.parecer': 1,
        'enrolled.linhaPesquisa': 1,
      }
    ).populate({
      path: "enrolled.idUser",
      select: "fullname",
    }).populate({
      path: "enrolled.linhaPesquisa",
      select: `${req.query.language}.title`
    });

  if (result) {
    result = {
      _id: result._id,
      enrolled: result.enrolled.map(enr => (
        {
          idUser: enr.idUser,
          linhaPesquisa: {
            _id: enr.linhaPesquisa._id,
            title: enr.linhaPesquisa[req.query.language].title
          },
          parecer: enr.parecer,
        }
      ))
    }
  }

  return result;
}


async function getProcessoSeletivo(req) {
  let whereClause = {};
  if (req.query.isAtivo != undefined) whereClause.isAtivo = req.query.isAtivo;
  return await ProcessoSeletivoModel.find(whereClause, { enrolled: 0 })
    .sort({
      createdAt: -1
    });
}

async function getProcessoSeletivoHeaders(req) {
  let whereClause = {}
  if(req.query.onlyActive == 'true') {
    whereClause.isAtivo = true;
  }
  return await ProcessoSeletivoModel.find(whereClause, { title: 1 })
    .sort({
      createdAt: -1
    });
}

// async function getProcessoSeletivoInscreverInfosById(idProcessoSeletivo, language) {
//   let ret = await ProcessoSeletivoModel.findOne(
//       { _id: idProcessoSeletivo }, 
//       { 
//         researchLine: 1, 
//         vagas: 1,
//         type: 1
//       }
//     )
//     .populate(
//       {
//         path: "researchLine",
//         select: `${language}.title corpoDocente`,
//         populate: {
//           path: "corpoDocente",
//           select: "fullName"
//         }
//       }
//     )
//     .sort({
//       createdAt: -1
//     });

//   if (ret) {
//     ret = {
//       _id: ret._id,
//       researchLine: ret.researchLine.map((linhaPesquisa, index) => {
//         const vagalinha = ret.vagas?.find(v => v.idLinhaPesquisa == linhaPesquisa._id)
//         let corpoAux = [... linhaPesquisa.corpoDocente];
//         console.log("linhaPesquisa - "+index, corpoAux)
//         if(vagalinha) {

//           if(ret.type == MESTRADO) {
//             // Tipo MESTRADO
//             linhaPesquisa[language].title += buildTextVaga(vagalinha.maxVaga, vagalinha.maxVagaCota)
//           } else if(ret.type == DOUTORADO) {
//             // Tipo DOUTORADO
//             console.log("ENTROU vagalinhavagalinhavagalinhavagalinha: ", vagalinha)
//             console.log("ENTROU linhaPesquisa.corpoDocentelinhaPesquisa.corpoDocente: ", linhaPesquisa)

//             corpoAux.forEach(prof => {
//               const vagaProf = vagalinha.professors?.find(p => p.idProfessor == prof.id);
//               if(vagaProf && linhaPesquisa._id == vagalinha.idLinhaPesquisa) {
//                 console.log("4444444444444444444444: ", vagaProf)
//                 prof.fullName += buildTextVaga(vagaProf.maxVaga, vagaProf.maxVagaCota);
//               }
//             })
//             console.log("LINHA FIM >>> ", corpoAux)
//           }
//         }

//         return (
//           {
//             _id: linhaPesquisa._id,
//             corpoDocente: corpoAux,
//             title: linhaPesquisa[language].title,
//           }
//         )
//       }),
//       vagas: ret.vagas,
//     }
//   }
//   return ret;
// }
async function getProcessoSeletivoInscreverInfosById(idProcessoSeletivo, language) {
  const ret = await ProcessoSeletivoModel.findOne({ _id: idProcessoSeletivo }, { researchLine: 1, vagas: 1, type: 1 })
    .populate({
      path: 'researchLine',
      select: `${language}.title corpoDocente`,
      populate: {
        path: 'corpoDocente',
        select: 'fullName',
      },
    })
    .sort({ createdAt: -1 });

  if (!ret) {
    return ret;
  }
  const researchLine = ret.researchLine.map((linhaPesquisa) => {
    let vagalinha;
    if (vagalinha) {
      vagalinha = ret.vagas.find((v) => v.idLinhaPesquisa == linhaPesquisa._id);
    }
    let corpoAux = [];
    linhaPesquisa.corpoDocente.forEach(cdin => corpoAux.push({ ...cdin._doc }))
    if (vagalinha) {
      if (ret.type === MESTRADO) {
        linhaPesquisa[language].title += buildTextVaga(vagalinha.maxVaga, vagalinha.maxVagaCota);
      } else if (ret.type === DOUTORADO) {
        corpoAux.forEach((prof) => {
          let vagaProf;
          if (vagalinha.professors) {
            vagaProf = vagalinha.professors.find((p) => p.idProfessor == prof._id);
          }

          if (vagaProf && linhaPesquisa._id == vagalinha.idLinhaPesquisa) {
            prof.fullName += buildTextVaga(vagaProf.maxVaga, vagaProf.maxVagaCota);
          }
        });
      }
    }

    return {
      _id: linhaPesquisa._id,
      corpoDocente: corpoAux,
      title: linhaPesquisa[language].title,
    };
  });

  return {
    _id: ret._id,
    researchLine,
    vagas: ret.vagas,
  };
}

function buildTextVaga(qtdVaga, qtdVagaCota) {
  let textVaga = ' - ';

  textVaga += "( ";
  textVaga += (qtdVaga != undefined ? qtdVaga : 0) + " AC";
  textVaga += " / ";
  textVaga += (qtdVagaCota != undefined ? qtdVagaCota : 0) + " AA";
  textVaga += " )";

  return textVaga;

}

async function getInscritosByProcessoSelectivo(req, idProcessoSeletivo, idParecerista, filterByLinha) {
  const searchText = req.query.searchText;
  const page = req.query.page;
  const limit = req.query.limit;

  let processo = await ProcessoSeletivoModel
    .findOne({ _id: idProcessoSeletivo })
    .populate({ path: 'enrolled.idUser', select: 'fullname socialname email cpf' })
    .populate({ path: 'enrolled.parecerista.primeiro', select: 'fullname' })
    .populate({ path: 'enrolled.parecerista.segundo', select: 'fullname' })
    .populate({
      path: 'enrolled.linhaPesquisa',
      select: 'avaliadores coordenadores',
      populate: {
        path: `avaliadores ${req.query.language}.title`,
        select: "email fullname roles"
      }
    })
    // .populate({ path: 'enrolled.linhaPesquisa.avaliadores', select: 'email fullname roles' })
    .sort({
      createdAt: -1
    });

  const statusAguardando = ["aguardandoHomolog", "aguardandoAprov"];
  const statusHomologa = ["reprovadoHomolog", "homologadoHomolog"];
  const statusAprov = ["reprovadoAprov", "aprovadoAprov"];
  const statusRecurso = ["recursoSolicitado", "recursoNaoAprovado", "recursoAprovado"];
  if (processo) {
    processo.enrolled = processo.enrolled ? processo.enrolled : [];
    const result = {
      _id: processo._id,
      etapa: processo.etapa,
      etapaAvaliacao: processo.etapaAvaliacao,
      criterio: processo.criterio,
      criterioHomologacao: processo.criterioHomologacao,
      enrolled: processo.enrolled.filter((e) => {
          flagReturn = true;
          let cpfToTest = e.idUser.cpf.replace(/\D/g, '');
          if(searchText && !e.idUser.fullname.toLowerCase().includes(searchText.toLowerCase()) && !cpfToTest.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
          }
          
          if(idParecerista) {
            // valida se parecerista da inscricao
            flagReturn = e.parecerista && 
              (
                (e.parecerista.primeiro && e.parecerista.primeiro.equals(idParecerista)) || 
                (e.parecerista.segundo && e.parecerista.segundo.equals(idParecerista))
              )

            // valida se disponivel para avaliar
            if(flagReturn && e.parecer) {
              if(processo.etapa == 'homologacao') {
                flagReturn = typeof e.parecer.homologado != 'boolean' && e.parecerista[e.responsavelHomologacao]?.equals(idParecerista)

              } else if(processo.etapa == 'avaliacao') {
                if(e.parecer.avaliacoes) {
                  let idEtapaVigente = processo.criterio?.step[processo.etapaAvaliacao]._id;
                  let etapaAvaliada = e.parecer.avaliacoes['avaliador-'+idParecerista]?.step['step-'+idEtapaVigente]?.totalNotaEtapa;
                  flagReturn = etapaAvaliada == null || etapaAvaliada == undefined;
                }
              } else {
                flagReturn = false;
              }
            }
          }
          else if(filterByLinha) flagReturn = !!filterByLinha.find(fbl => fbl.equals(e.linhaPesquisa ? e.linhaPesquisa._id : null));
          
          

          //if (idParecerista) flagReturn = e.parecerista && e.parecerista.equals(idParecerista)
          if (req.query.filtroConsulta) {

            if (statusRecurso.includes(req.query.filtroConsulta)) {

              if (e.parecer) {
                let hasSolicitado, hasAprovado, hasReprovado;
                hasSolicitado = hasAprovado = hasReprovado = false;

                if (e.parecer.recursoHomolog && typeof e.parecer.recursoHomolog.justificativa == 'string') {
                  hasSolicitado = typeof e.parecer.recursoHomolog.respostaJustificativa != 'string';
                  hasAprovado = e.parecer.recursoHomolog.recursoAceito == true;
                  hasReprovado = e.parecer.recursoHomolog.recursoAceito == false;
                }

                let etapas;
                if (e.parecer) {
                  etapas = e.parecer.step;
                }

                if (etapas) {
                  Object.values(etapas).forEach((etapa, index) => {
                    if (etapa.recurso && typeof etapa.recurso.justificativa == 'string') {
                      hasSolicitado = hasSolicitado || typeof etapa.recurso.respostaJustificativa != 'string';
                      hasAprovado = hasAprovado || etapa.recurso.recursoAceito == true;
                      hasReprovado = hasReprovado || etapa.recurso.recursoAceito == false;
                    }
                  })
                }
                flagReturn =
                  (req.query.filtroConsulta == "recursoSolicitado" && hasSolicitado) ||
                  (req.query.filtroConsulta == "recursoNaoAprovado" && hasReprovado) ||
                  (req.query.filtroConsulta == "recursoAprovado" && hasAprovado && !hasSolicitado && !hasReprovado);



              } else {
                flagReturn = false;
              }

            } else if (statusAguardando.includes(req.query.filtroConsulta)) {
              let isWaitingApprove = false;

              let hasUndefined = false;
              let isAprovado = true;
              let etapas;
              if (e.parecer) {
                etapas = e.parecer.step;
              }
              if (etapas) {
                Object.values(etapas).forEach(etapa => {
                  if (etapa.stepApproval == undefined) {
                    hasUndefined = true;
                  }
                  isAprovado = isAprovado && etapa.stepApproval == true;
                })
                isWaitingApprove = isAprovado && !hasUndefined;
              } else {
                isWaitingApprove = true;
              }


              flagReturn = flagReturn && (e.parecer == undefined || (req.query.filtroConsulta == 'aguardandoAprov' && isWaitingApprove) || (req.query.filtroConsulta == 'aguardandoHomolog' && e.parecer.homologado == undefined))
            } else {
              let flagAprov = false;
              let hasUndefined = false;
              let isAprovado = true;
              if (e.parecer && statusAprov.includes(req.query.filtroConsulta)) {
                // e.parecer.aprovado == (req.query.filtroConsulta == 'aprovadoAprov');
                const etapas = e.parecer.step;
                if (etapas) {
                  Object.values(etapas).forEach(etapa => {
                    if (etapa.stepApproval == undefined) {
                      hasUndefined = true;
                    }
                    isAprovado = isAprovado && etapa.stepApproval == true;
                  })
                } else {
                  hasUndefined = true;
                }
              }
              flagAprov = isAprovado == (req.query.filtroConsulta == 'aprovadoAprov') && ((req.query.filtroConsulta == 'aprovadoAprov' && !hasUndefined) || (req.query.filtroConsulta == 'reprovadoAprov'))
              const flagHomolog = e.parecer && statusHomologa.includes(req.query.filtroConsulta) && e.parecer.homologado == (req.query.filtroConsulta == 'homologadoHomolog')
              flagReturn = flagReturn && (flagAprov || flagHomolog);
            }
          }
            
          return flagReturn;
        })
        .sort((ea, eb) => ea.idUser?.fullname.localeCompare(eb.idUser?.fullname))
        .map(e => (
          {
            _id: e._id,
            idUser: e.idUser,
            parecerista: e.parecerista,
            responsavelHomologacao: e.responsavelHomologacao,
            parecer: e.parecer,
            possiveisAvaliadores: e.linhaPesquisa.avaliadores,
            titleLinhaPesquisa: e.linhaPesquisa[req.query.language].title,
            coordenadoresLinha: e.linhaPesquisa ? e.linhaPesquisa.coordenadores : [],

          }
        )),
    }
    if(page && limit) {
      result.enrolled = result.enrolled.slice((page-1)*limit, (page*limit)+1);
    }
    return result
  } else {
    return { _id: idProcessoSeletivo, enrolled: [] }
  }
}

const prefixoRecurso = ['justificativa', 'respostaJustificativa'];
async function inscricaoJustificar(idUser, req) {
  const idProcesso = req.query.idProcesso;
  const idInscricao = req.query.idInscricao;
  const idStep = req.query.idStep;
  const prefixoRecursoRecebido = req.query.prefixoRecurso;
  const justificativa = req.body.justificativa;
  const recursoAceito = req.body.recursoAceito;

  if (!prefixoRecurso.includes(prefixoRecursoRecebido))
    throw "Prefixo não reconhecido!";

  let toSet = { [`enrolled.$.parecer.step.step-${idStep}.recurso.${prefixoRecursoRecebido}`]: justificativa };
  if (typeof recursoAceito == 'boolean')
    toSet[`enrolled.$.parecer.step.step-${idStep}.recurso.recursoAceito`] = recursoAceito;
  return ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    { $set: toSet },
    { upsert: false }
  );

}

async function inscricaoJustificarHomolog(idUser, req) {
  const idProcesso = req.query.idProcesso;
  const idInscricao = req.query.idInscricao;
  const prefixoRecursoRecebido = req.query.prefixoRecurso;
  const justificativa = req.body.justificativa;
  const recursoAceito = req.body.recursoAceito;

  if (!prefixoRecurso.includes(prefixoRecursoRecebido))
    throw "Prefixo não reconhecido!";

  let toSet = { [`enrolled.$.parecer.recursoHomolog.${prefixoRecursoRecebido}`]: justificativa, }
  if (typeof recursoAceito == 'boolean')
    toSet[`enrolled.$.parecer.recursoHomolog.recursoAceito`] = recursoAceito;

  return ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    { $set: toSet },
    { upsert: false }
  );

}

async function getMinhaInscricoesProcessoSelectivo(idUser) {
  return await ProcessoSeletivoModel
    .find({ enrolled: { $elemMatch: { idUser } } }, { _id: 1 })
    .sort({
      createdAt: -1
    });

}

async function getMinhaInscricoesDetalhadaProcessoSelectivo(idUser, language) {
  return await ProcessoSeletivoModel
    .find(
      { enrolled: { $elemMatch: { idUser } } },
      {
        title: 1,
        criterio: 1,
        'enrolled.$': 1,
      }
    )
    .populate({
      path: "enrolled.primeiroOrientador",
      select: "fullName",
    })
    .populate({
      path: "enrolled.segundoOrientador",
      select: "fullName",
    })
    .populate({
      path: 'enrolled.linhaPesquisa',
      select: `${language}.title`,
    })
    .sort({
      createdAt: -1
    });

}

async function insertProcessoSeletivo(req, idUser) {
  let form = req.body.formulario;
  form.user = idUser;
  return await new ProcessoSeletivoModel(form).save();
}

async function registrarParecer(req, idUser) {
  const idProcesso = req.query.idProcesso;
  const idInscricao = req.query.idInscricao;
  const form = req.body.formulario;
  const emailInscrito = req.body.emailInscrito;

  let parecer = await ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    { $set: { [`enrolled.$.parecer.avaliacoes.avaliador-${idUser}`]: {...form} } },
    { upsert: false }
  );

  await consolidarAvaliacaoAutomatico(idProcesso, idInscricao);

  
  let email = templateEmail.atualizacaoParecerProcessoSeletivo;
  emailSender.sendMailAWS(emailInscrito, 'Processo Seletivo', email);
  return parecer;
}

async function changeHomologInscricao(body) {
  const { value, idInscricaoSelecionada, idProcessoSelecionado, justificaIndeferido } = body;


  return ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcessoSelecionado, enrolled: { $elemMatch: { _id: idInscricaoSelecionada } } },
    {
      $set: {
        "enrolled.$.parecer.homologado": value,
        "enrolled.$.parecer.recursoHomolog.justificaIndeferido": justificaIndeferido
      }
    },
    { upsert: false }
  );
}

async function changeHomologInscricaoV2(body) {
  const { idInscricao, idProcesso, formulario, deferido, justificaIndeferido } = body;


  return ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    {
      $set: {
        "enrolled.$.parecer.homologacao": formulario.questionHomolog,
        "enrolled.$.parecer.homologado": deferido,
        "enrolled.$.parecer.recursoHomolog.justificaIndeferido": justificaIndeferido
      }
    },
    { upsert: false }
  );
}

async function getHomologacaoV2(req) {
  const { idInscricao, idProcesso } = req.query;

  return ProcessoSeletivoModel.findOne(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    {'enrolled.$': 1,}
  );
}

async function getParecer(req, idUser) {
  const idProcesso = req.query.idProcesso;
  const idInscricao = req.query.idInscricao;


  return ProcessoSeletivoModel.findOne(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    {'enrolled.$': 1, 'etapa': 1, 'etapaAvaliacao': 1}
  );
}

async function mudarEtapa(body) {
  const { idProcesso, etapa } = body;

  return await ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso },
    { etapa: etapa },
    { upsert: false }
  );
}

async function mudarEtapaAvaliacao(body) {
  const { idProcesso, etapa } = body;

  return await ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso },
    { etapaAvaliacao: etapa },
    { upsert: false }
  );
}

async function atualizarProcessoSeletivoAtivo(req, idProcesso) {

  let isAtivo = req.body.isAtivo;
  return await ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso },
    { isAtivo: !!isAtivo },
    { upsert: false }
  );
}

async function subscribePerfilCandidato(req) {
   await ProcessoSeletivoModel
  .findOneAndUpdate(
    { _id: req.params.idProcesso, enrolled: { $elemMatch: { _id: req.params.idInscricao } } },
    { $set: { 
      "enrolled.$.perfilCandidato": req.body.formulario,
    } },
    { upsert: false }
  );
  return {status: 201}
}

async function subscribeProcessoSeletivo(req) {
  try {
    const ramdom = Math.random().toString(36).slice(-4);
    const nowHour = String(Date.now()).slice(-4);
    const codInscricaoGerado = ramdom + nowHour;

    let formulario = JSON.parse(req.body.formulario);
    filesWithName = {
      fileConclusaoGraduacao: req.files.fileConclusaoGraduacao,
      fileIndigena: req.files.fileIndigena,
      fileCondicaoDeficiencia: req.files.fileCondicaoDeficiencia,
      fileCondicaoDeficienciaDois: req.files.fileCondicaoDeficienciaDois,
      fileCertidaoNascimentoFilho: req.files.fileCertidaoNascimentoFilho,
      fileComprovanteResidencia: req.files.fileComprovanteResidencia,
      fileComprovantePagamento: req.files.fileComprovantePagamento,
    }
    let retUpload = await uploadFilesProcessoSeletivo(req.files.fileArray, formulario.idProcesso, req.user._id, formulario.tipoFormulario, filesWithName);
    if (retUpload.temErro) throw retUpload.mensagem;
    formulario.files = retUpload;
    formulario.codInscricao = codInscricaoGerado;

    await UserController.subscribeProcessoSeletivo(req.user._id, req.params.id);
    await ProcessoSeletivoModel.findOneAndUpdate({
      _id: req.params.id, isAtivo: true
    },
      { $addToSet: { enrolled: { idUser: req.user._id, ...formulario, idProcesso: null } } },
      { upsert: false }
    );

    let processoInscricao = await ProcessoSeletivoModel.findOne({ 
        _id: req.params.id,
        "enrolled.idUser": req.user._id
      },
      { "enrolled.$": 1 }
    );

    // Captura o ID do novo item adicionado
    let newItemId = processoInscricao.enrolled[0]._id;

    let email = templateEmail.inscricaoProcessoSeletivo;
    emailSender.sendMailAWS(req.user.email, 'Processo Seletivo', email);

    return {status: 200, body: {idInscricao: newItemId}};
  } catch (e) {
    console.log(e);
    return {status: 500};
  }
}

async function uploadFilesProcessoSeletivo(files, idProcesso, idUser, tipoFormulario, filesWithName) {
  let retorno = {
    pathLattes: '',
    pathMemorial: '',
    pathComprovantePagamento: '',
    pathProjetoTese: '',
    pathPrincipalPubli: '',
    fileConclusaoGraduacao: '',
    fileIndigena: '',
    fileCondicaoDeficiencia: '',
    fileCondicaoDeficienciaDois: '',
    fileCertidaoNascimentoFilho: '',
    fileComprovanteResidencia: '',
    fileComprovantePagamento: '',
  }
  Object.keys(filesWithName).forEach(async fileChave => {
    if(filesWithName[fileChave]) {
      let fileNameNamed = `processo-seletivos/${idProcesso}/${idUser}/${Date.now()}${filesWithName[fileChave].name}`;
      
      await S3Uploader.uploadFile(fileNameNamed, filesWithName[fileChave].data).then(fileData => {
        retorno[fileChave] = fileNameNamed;
      }, err => {
        console.log('Erro ao enviar o trabalho para AWS: ' + fileNameNamed);
        retorno.temErro = true;
        retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
      });
    }
  })
  let fileName;

  for (let i = 0; i < files.length; i++) {

    fileName = `processo-seletivos/${idProcesso}/${idUser}/${Date.now()}${files[i].name}`;
    await S3Uploader.uploadFile(fileName, files[i].data).then(fileData => {
      if (tipoFormulario == 1) { // MESTRADO
        if (i == 0) {
          retorno.pathLattes = fileName;
        } else if (i == 1) {
          retorno.pathPreProj = fileName;
        }
      } else if (tipoFormulario == 2) { // DOUTORADO
        if (i == 0) {
          retorno.pathLattes = fileName;
        } else if (i == 1) {
          retorno.pathProjetoTese = fileName;
        } else if (i == 2) {
          retorno.pathPrincipalPubli = fileName;
        }

      }
    }, err => {
      console.log('Erro ao enviar o trabalho para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });
  }
  return retorno;

}

async function unsubscribeProcessoSeletivo(idProcessoSeletivo, idUser) {
  try {
    await UserController.unsubscribeProcessoSeletivo(idProcessoSeletivo, idUser);
    await ProcessoSeletivoModel.findOneAndUpdate({
      _id: idProcessoSeletivo
    },
      { $pull: { enrolled: { idUser } } },
      { upsert: false }
    );
  } catch (e) {
    console.log(e);
  }
  return
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

async function salvarVinculoCriterio(req) {
  const criterio = req.body.criterio;
  const idProcesso = req.params.id;
  const retorno = await ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso, etapa: 'inscricao' },
    { criterio },
    { upsert: false }
  )

  if (retorno) {
    console.log("ACHOU PROCESSO");
    return getSuccessByStatus(200, "Critério vinculado com sucesso!");
  }
  else {
    return getErrorByStatus(400, `Processo Seletivo não encontrado! Certifique-se que ele esteja na etapa de "Inscrição".`)
  }
}

async function salvarVinculoCriterioHomologacao(req) {
  const criterioHomologacao = req.body.criterioHomologacao;
  const idProcesso = req.params.id;
  const retorno = await ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso, etapa: 'inscricao' },
    { criterioHomologacao },
    { upsert: false }
  )

  if (retorno) {
    return getSuccessByStatus(200, "Critério vinculado com sucesso!");
  }
  else {
    return getErrorByStatus(400, `Processo Seletivo não encontrado! Certifique-se que ele esteja na etapa de "Inscrição".`)
  }
}

async function deleteProcessoSeletivo(id) {
  return await ProcessoSeletivoModel.findOneAndRemove({
    _id: id
  });
}

/* Fim Processo Seletivo */