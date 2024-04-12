
const ProcessoSeletivoModel = require('../models/processo-seletivo.model');
const UserController = require('./user.controller')
const S3Uploader = require('./aws.controller');
const { getErrorByStatus, getSuccessByStatus } = require('../service/error.service');
const { default: mongoose } = require('mongoose');

const MESTRADO = 1, DOUTORADO = 2;

module.exports = {
  getProcessoSeletivo,
  insertProcessoSeletivo,
  getInscritosByProcessoSelectivo,
  getMinhaInscricoesProcessoSelectivo,
  getMinhaInscricoesDetalhadaProcessoSelectivo,
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
  salvarVinculoCriterio,
  changeHomologInscricao,
  consolidarAvaliacao,
};



/* Processo Seletivo */

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
        } },
        { upsert: false }
      );

    if (processo)
      return getSuccessByStatus(200, "Avaliadores vinculados com sucesso!");
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
      createAt: -1
    });
}

async function getProcessoSeletivoHeaders(req) {
  return await ProcessoSeletivoModel.find({}, { title: 1 })
    .sort({
      createAt: -1
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
//       createAt: -1
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
    .sort({ createAt: -1 });

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


  let processo = await ProcessoSeletivoModel
    .findOne({ _id: idProcessoSeletivo })
    .populate({ path: 'enrolled.idUser', select: 'fullname socialname' })
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
      createAt: -1
    });

  const statusAguardando = ["aguardandoHomolog", "aguardandoAprov"];
  const statusHomologa = ["reprovadoHomolog", "homologadoHomolog"];
  const statusAprov = ["reprovadoAprov", "aprovadoAprov"];
  const statusRecurso = ["recursoSolicitado", "recursoNaoAprovado", "recursoAprovado"];
  if (processo) {
    processo.enrolled = processo.enrolled ? processo.enrolled : [];
    const result = {
      _id: processo._id,
      criterio: processo.criterio,
      enrolled: processo.enrolled.filter((e) => {
          flagReturn = true;
          
          if(idParecerista) flagReturn = e.parecerista && ((e.parecerista.primeiro && e.parecerista.primeiro.equals(idParecerista)) || (e.parecerista.segundo && e.parecerista.segundo.equals(idParecerista)))
          else if(filterByLinha) flagReturn = !!filterByLinha.find(fbl => fbl.equals(e.linhaPesquisa ? e.linhaPesquisa._id : null));
          
          

          //if (idParecerista) flagReturn = e.parecerista && e.parecerista.equals(idParecerista)
          console.log("flagReturnflagReturnflagReturnflagReturnflagReturn ", e.parecerista)
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
        }).map(e => (
          {
            _id: e._id,
            idUser: e.idUser,
            parecerista: e.parecerista,
            parecer: e.parecer,
            possiveisAvaliadores: e.linhaPesquisa.avaliadores,
            titleLinhaPesquisa: e.linhaPesquisa[req.query.language].title,
            coordenadoresLinha: e.linhaPesquisa ? e.linhaPesquisa.coordenadores : [],

          }
        )),
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
      createAt: -1
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
      createAt: -1
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
  return ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    { $set: { [`enrolled.$.parecer.avaliacoes.avaliador-${idUser}`]: {...form} } },
    { upsert: false }
  );
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

async function getParecer(req, idUser) {
  const idProcesso = req.query.idProcesso;
  const idInscricao = req.query.idInscricao;

  console.log("idUser: ", idUser)

  return ProcessoSeletivoModel.findOne(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    {'enrolled.$': 1,}
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

async function atualizarProcessoSeletivoAtivo(req, idProcesso) {

  let isAtivo = req.body.isAtivo;
  return await ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso },
    { isAtivo: !!isAtivo },
    { upsert: false }
  );
}

async function subscribeProcessoSeletivo(req) {
  try {
    const ramdom = Math.random().toString(36).slice(-4);
    const nowHour = String(Date.now()).slice(-4);
    const codInscricaoGerado = ramdom + nowHour;

    let formulario = JSON.parse(req.body.formulario);
    let retUpload = await uploadFilesProcessoSeletivo(req.files.fileArray, formulario.idProcesso, req.user._id, formulario.tipoFormulario);
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
  } catch (e) {
    console.log(e);
    return 500;
  }
  return 200;
}

async function uploadFilesProcessoSeletivo(files, idProcesso, idUser, tipoFormulario) {
  let retorno = {
    pathLattes: '',
    pathMemorial: '',
    pathComprovantePagamento: '',
    pathProjetoTese: '',
    pathPrincipalPubli: ''
  }

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

async function deleteProcessoSeletivo(id) {
  return await ProcessoSeletivoModel.findOneAndRemove({
    _id: id
  });
}

/* Fim Processo Seletivo */