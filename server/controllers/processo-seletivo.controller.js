
const ProcessoSeletivoModel = require('../models/processo-seletivo.model');
const UserController = require('./user.controller')
const S3Uploader = require('./aws.controller');

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
  getProcessoSeletivoInscreverInfosById,
};



/* Processo Seletivo */

async function getProcessoSeletivo(req) {
  let whereClause = {};
  if (req.query.isAtivo != undefined) whereClause.isAtivo = req.query.isAtivo;
  return await ProcessoSeletivoModel.find(whereClause, { enrolled: 0 })
    .sort({
      createAt: -1
    });
}

async function getProcessoSeletivoInscreverInfosById(idProcessoSeletivo, language) {
  let ret = await ProcessoSeletivoModel.findOne({ _id: idProcessoSeletivo }, { researchLine: 1 })
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
      researchLine: ret.researchLine.map(data => (
        {
          _id: data._id,
          corpoDocente: data.corpoDocente,
          title: data[language].title,
        }
      ))
    }
  }
  return ret;
}

async function getInscritosByProcessoSelectivo(idProcessoSeletivo) {
  return await ProcessoSeletivoModel
    .findOne({ _id: idProcessoSeletivo }, { enrolled: 1 })
    .populate({ path: 'enrolled', select: 'fullname socialname' })
    .sort({
      createAt: -1
    });

}

async function getMinhaInscricoesProcessoSelectivo(idUser) {
  return await ProcessoSeletivoModel
    .find({ enrolled: idUser }, { _id: 1 })
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
    { _id: idProcesso },
    { isAtivo: !!isAtivo },
    { upsert: false }
  );
}

async function subscribeProcessoSeletivo(req) {
  try {
    let formulario = JSON.parse(req.body.formulario);
    let retUpload = await uploadFilesProcessoSeletivo(req.files.fileArray, formulario.idProcesso, req.user._id, formulario.tipoFormulario);
    if(retUpload.temErro) throw retUpload.mensagem;
    formulario.files = retUpload;

    await UserController.subscribeProcessoSeletivo(req.user._id, formulario);
    await ProcessoSeletivoModel.findOneAndUpdate({
      _id: req.params.id, isAtivo: true
    },
      { $addToSet: { enrolled: req.user._id } },
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
      if(tipoFormulario == 1) { // MESTRADO
        if (i == 0) {
          retorno.pathLattes = fileName;
        } else if (i == 1) {
          retorno.pathComprovantePagamento = fileName;
        } else if (i == 2) {
          retorno.pathPreProj = fileName;
        } else if (i == 3) {
          retorno.pathMemorial = fileName;
        }
      } else if(tipoFormulario == 2) { // DOUTORADO
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
      { $pull: { enrolled: idUser } },
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

async function deleteProcessoSeletivo(id) {
  return await ProcessoSeletivoModel.findOneAndRemove({
    _id: id
  });
}

/* Fim Processo Seletivo */