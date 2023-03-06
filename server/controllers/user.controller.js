const bcrypt = require('bcrypt');
const Joi = require('joi');
const UserModel = require('../models/user.model');
const User = require('../models/user.model');
const { getErrorByStatus, getSuccessByStatus } = require('../service/error.service');
const mongoose = require('mongoose');
const linhaPesquisaService = require('../service/linha_pesquisa.service');
const LinhaPesquisaModel = require('../models/linha-pesquisa.model');
const templateEmail = require('../config/templateEmails');
const emailSender = require('../controllers/email.controller');

module.exports = {
  insert,
  getByIdOnlyProcesso,
  subscribeProcessoSeletivo,
  unsubscribeProcessoSeletivo,
  resetPassword,
  generateNewPassword,

  cadastrarParecerista,
  removerParecerista,
  listarPareceristas,
  adicionarCoordenador,
  removerCoordenador,
};

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  
  let success = await new User(user).save();

  if(success) {
    let email = templateEmail.inscricaoSucesso;
    emailSender.sendMailAWS(user.email, 'Bem-Vindo!', email);
  }
}

async function getByIdOnlyProcesso(idUser, req) {
  let userResult = await UserModel.findOne(
    { _id: idUser },
    {
      fullname: 1,
      email: 1,
      socialname: 1,
      cpf: 1,
      rg: 1,
      rgEmissor: 1,
      passaporte: 1,
      dataNiver: 1,
      nacionalidade: 1,
      endereco: 1,
      bairro: 1,
      cep: 1,
      cidade: 1,
      estado: 1,
      celular: 1,
      telefone: 1,
      cargo: 1,
      empresa: 1,
      deficiencia: 1,
      cor: 1,
      genero: 1,
      processosSeletivo: {
        $elemMatch: { idProcesso: req.query.idProcesso }
      }
    }
  )
    .populate({
      path: "processosSeletivo.primeiroOrientador",
      select: "fullName",
    })
    .populate({
      path: "processosSeletivo.segundoOrientador",
      select: "fullName",
    })
    .populate({
      path: "processosSeletivo.linhaPesquisa",
      select: `${req.query.language}.title`,
    });

  return userResult
}

async function subscribeProcessoSeletivo(idUser, idProcesso) {
  return await UserModel.findOneAndUpdate(
    { _id: idUser },
    {
      $addToSet: {
        processosSeletivo: { idProcesso }
      }
    },
    { upsert: false }
  );
}


async function unsubscribeProcessoSeletivo(idProcessoSeletivo, idUser) {
  return await UserModel.findOneAndUpdate({
    _id: idUser
  },
    { $pull: { processosSeletivo: idProcessoSeletivo } },
    { upsert: false }
  );
}

/* Parecerista */

async function adicionarCoordenador(idUser) {
  try {
    let user = await UserModel.findOneAndUpdate(
      { _id: idUser },
      { $addToSet: { roles: "coordenador" } },
      { upsert: false }
    );
    if (user)
      return getSuccessByStatus(200, "Coordenador cadastrado com sucesso!");
    else
      return getErrorByStatus(404, "Usuário não encontrado na base!")
  } catch (error) {
    return getErrorByStatus(500)
  }
}

async function removerCoordenador(idUser) {
  try {
    let user = await UserModel.findOneAndUpdate(
      { _id: idUser },
      { $pull: { roles: "coordenador" } },
      { upsert: false }
    );
    if (user)
      return getSuccessByStatus(200, "Coordenador removido com sucesso!");
    else
      return getErrorByStatus(404, "Usuário não encontrado na base!")
  } catch (error) {
    return getErrorByStatus(500)

  }
}

async function cadastrarParecerista(email, idLinhaPesquisa) {
  let response = getErrorByStatus(500);
  try {
    if (validateEmail(email)) {
      // Adiciona permissao "parecerista" ao usuario
      let user = await UserModel.findOneAndUpdate(
        { email: email },
        { $addToSet: { roles: "parecerista" } },
        { upsert: false }
      );

      if (user) {

        // Adiciona id do usuario na linha de pesquisa
        await LinhaPesquisaModel.findOneAndUpdate(
          { _id: idLinhaPesquisa },
          { $addToSet: { avaliadores: user._id } },
          { upsert: false }
        );

        response = getSuccessByStatus(200, "Avaliador cadastrado com sucesso!");
      } else {
        response = getErrorByStatus(404, "Usuário não encontrado na base!");
      }
    } else {
      response = getErrorByStatus(400);
    }
  } catch (ex) {
    console.log(ex)
    response = getErrorByStatus(500);
  } finally {
    return response;
  }
}

async function removerParecerista(idUser, idLinhaPesquisa) {
  try {
    const linhaRemovida = await LinhaPesquisaModel.findOneAndUpdate(
      { _id: idLinhaPesquisa },
      { $pull: { avaliadores: idUser } },
      { upsert: false }
    )

    let linhaVinculada = await LinhaPesquisaModel.findOne(
      { avaliadores: idUser },
      { _id: 1 }
    );
    let user;
    if (!linhaVinculada) {
      user = await UserModel.findOneAndUpdate(
        { _id: idUser },
        { $pullAll: { roles: ["coordenador", "parecerista"] } },
        { upsert: false }
      );
    }

    if (linhaRemovida || user)
      return getSuccessByStatus(200, "Parecerista removido com sucesso!");
    else
      return getErrorByStatus(404, "Usuário não encontrado na base!")
  } catch (error) {
    console.log(error)
    return getErrorByStatus(500)

  }
}

async function listarPareceristas() {
  return await UserModel.find({ roles: "parecerista" }, { fullname: 1, email: 1, roles: 1 });
}

async function resetPassword(req, user) {
  const hashString = bcrypt.hashSync(req.body.password, 10);

  let response = {
    status: 200,
    message: `Senha alterada com sucesso.`
  };

  await User.findByIdAndUpdate(user._id, {
    '$set': {
      mailCodePassword: null,
      hashedPassword: hashString
    }
  })

  return response;

}

async function generateNewPassword(user) {
  const randomstring = Math.random().toString(36).slice(-8);

  let response = {
    status: 200,
    message: `Seu código para troca de senha foi enviado para seu email.`
  };

  await User.findOneAndUpdate({_id: user._id}, {
    '$set': {
      mailCodePassword: randomstring
    }
  })

  return response;

}


function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
/* Fim Parecerista */
