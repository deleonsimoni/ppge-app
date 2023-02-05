
const ProcessoSeletivoModel = require('../models/processo-seletivo.model');
const UserController = require('./user.controller')
const S3Uploader = require('./aws.controller');
const { getErrorByStatus, getSuccessByStatus } = require('../service/error.service');
const { default: mongoose } = require('mongoose');

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
  mudarEtapa,
  salvarVinculoCriterio,
  changeHomologInscricao
};



/* Processo Seletivo */

async function vincularParecerista(body) {
  try {
    let processo = await ProcessoSeletivoModel
      .findOneAndUpdate(
        { _id: body.idProcesso, enrolled: { $elemMatch: { _id: body.idInscricao } } },
        { $set: { "enrolled.$.parecerista": body.idParecerista } },
        { upsert: false }
      );

    if (processo)
      return getSuccessByStatus(200, "Parecerista vinculado com sucesso!");
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

  if(result) {
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

async function getProcessoSeletivoInscreverInfosById(idProcessoSeletivo, language) {
  let ret = await ProcessoSeletivoModel.findOne({ _id: idProcessoSeletivo }, { researchLine: 1, vagas: 1 })
    .populate(
      {
        path: "researchLine",
        select: `${language}.title corpoDocente`,
        populate: {
          path: "corpoDocente",
          select: "fullName"
        }
      }
    )
    .sort({
      createAt: -1
    });

  if (ret) {
    ret = {
      _id: ret._id,
      researchLine: ret.researchLine.map(data => {
        let vagasText = ''
        const vagalinha = ret.vagas?.find(v => v.idLinhaPesquisa == data._id)
        if(vagalinha) {
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA: ", vagalinha.maxVaga)
          vagasText += '('
          vagasText += vagalinha.maxVaga + (vagalinha.maxVaga > 1 ? ' vagas' : ' vaga');
          vagasText += ' / '
          vagasText += vagalinha.maxVagaCota + (vagalinha.maxVagaCota > 1 ? ' vagas' : ' vaga');
          vagasText += ')'
        }

        return (
          {
            _id: data._id,
            corpoDocente: data.corpoDocente,
            title: data[language].title + vagasText,
          }
        )
      }),
      vagas: ret.vagas,
    }
  }
  return ret;
}

async function getInscritosByProcessoSelectivo(req, idProcessoSeletivo, idParecerista) {


  let processo = await ProcessoSeletivoModel
    .findOne({_id: idProcessoSeletivo})
    .populate({ path: 'enrolled.idUser', select: 'fullname socialname' })
    .populate({ path: 'enrolled.parecerista', select: 'fullname' })
    .populate({
      path: 'enrolled.linhaPesquisa',
      select: 'avaliadores ',
      populate: {
        path: `avaliadores ${req.query.language}.title`,
        select: "email fullname roles"
      }
    })
    // .populate({ path: 'enrolled.linhaPesquisa.avaliadores', select: 'email fullname roles' })
    .sort({
      createAt: -1
    });

  const statusAguardando = ["aguardandoHomolog","aguardandoAprov"];
  const statusHomologa = ["reprovadoHomolog","homologadoHomolog"];
  const statusAprov = ["reprovadoAprov","aprovadoAprov"];
  if (processo) {
    processo.enrolled = processo.enrolled ? processo.enrolled : [];
    const result = {
      _id: processo._id,
      criterio: processo.criterio,
      enrolled: processo.enrolled.filter((e) => {
          flagReturn = true;
          
          if(idParecerista) flagReturn = e.parecerista && e.parecerista.equals(idParecerista)

          if(req.query.filtroConsulta) {
            if(statusAguardando.includes(req.query.filtroConsulta)) {
              flagReturn = flagReturn && (e.parecer == undefined || (req.query.filtroConsulta == 'aguardandoAprov' && e.parecer.aprovado == undefined) || (req.query.filtroConsulta == 'aguardandoHomolog' && e.parecer.homologado == undefined))
            } else {
              const flagAprov = e.parecer && statusAprov.includes(req.query.filtroConsulta) && e.parecer.aprovado == (req.query.filtroConsulta == 'aprovadoAprov')
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
            titleLinhaPesquisa: e.linhaPesquisa[req.query.language].title
          }
        )),
    }
    return result
  } else {
    return { _id: idProcessoSeletivo, enrolled: [] }
  }
}

async function inscricaoJustificar(idUser, req) {
  const idProcesso = req.query.idProcesso;
  const idInscricao = req.query.idInscricao;
  const justificativa = req.body.justificativa;

  return ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    { $set: { "enrolled.$.justificativa": justificativa } },
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

async function registrarParecer(req) {
  const idProcesso = req.query.idProcesso;
  const idInscricao = req.query.idInscricao;
  const form = req.body.formulario;
  return ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    { $set: { "enrolled.$.parecer": form } },
    { upsert: false }
  );
}

async function changeHomologInscricao(body) {
  const {value, idInscricaoSelecionada, idProcessoSelecionado} = body;
  return ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcessoSelecionado, enrolled: { $elemMatch: { _id: idInscricaoSelecionada } } },
    { $set: { "enrolled.$.parecer.homologado": value } },
    { upsert: false }
  );
}

async function getParecer(req) {
  const idProcesso = req.query.idProcesso;
  const idInscricao = req.query.idInscricao;

  return ProcessoSeletivoModel.findOne(
    { _id: idProcesso, enrolled: { $elemMatch: { _id: idInscricao } } },
    {
      "enrolled.$": 1,
    }
  );
}

async function mudarEtapa(body) {
  const {idProcesso, etapa} = body;

  return await ProcessoSeletivoModel.findOneAndUpdate(
    { _id: idProcesso },
    { etapa:etapa },
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
    let formulario = JSON.parse(req.body.formulario);
    let retUpload = await uploadFilesProcessoSeletivo(req.files.fileArray, formulario.idProcesso, req.user._id, formulario.tipoFormulario);
    if (retUpload.temErro) throw retUpload.mensagem;
    formulario.files = retUpload;

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
          retorno.pathComprovantePagamento = fileName;
        } else if (i == 2) {
          retorno.pathPreProj = fileName;
        } else if (i == 3) {
          retorno.pathMemorial = fileName;
        }
      } else if (tipoFormulario == 2) { // DOUTORADO
        if (i == 0) {
          retorno.pathLattes = fileName;
        } else if (i == 1) {
          retorno.pathComprovantePagamento = fileName;
        } else if (i == 2) {
          retorno.pathProjetoTese = fileName;
        } else if (i == 3) {
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
    {_id: idProcesso, etapa: 'inscricao'},
    {criterio},
    {upsert: false}
  )

  if(retorno) {
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