const bcrypt = require('bcrypt');
const Joi = require('joi');
const UserModel = require('../models/user.model');
const User = require('../models/user.model');
const { getErrorByStatus, getSuccessByStatus } = require('../service/error.service');
const mongoose = require('mongoose');

module.exports = {
  insert,
  getByIdOnlyProcesso,
  subscribeProcessoSeletivo,
  unsubscribeProcessoSeletivo,
  
  cadastrarParecerista,
  removerParecerista,
  listarPareceristas,
  adicionarCoordenador,
  removerCoordenador,
};

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}


async function getByIdOnlyProcesso(idUser, req) {
  let userResult = await UserModel.findOne(
    {_id: idUser},
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
        $elemMatch: {idProcesso: req.query.idProcesso}
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
    {_id: idUser},
    {
      $addToSet: {
        processosSeletivo: {idProcesso}
      }
    },
    {upsert: false}
  );
}


async function unsubscribeProcessoSeletivo(idProcessoSeletivo, idUser) {
  return await UserModel.findOneAndUpdate({
      _id: idUser
    },
    {$pull: {processosSeletivo: idProcessoSeletivo}}, 
    {upsert: false}
  );
}

/* Parecerista */

async function adicionarCoordenador(idUser) {
  try {
    let user = await UserModel.findOneAndUpdate(
      {_id:idUser},
      {$addToSet: {roles: "coordenador"}}, 
      {upsert: false}
    );
    if(user)
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
      {_id:idUser},
      {$pull: {roles: "coordenador"}}, 
      {upsert: false}
    );
    if(user)
      return getSuccessByStatus(200, "Coordenador removido com sucesso!");
    else
      return getErrorByStatus(404, "Usuário não encontrado na base!")
  } catch (error) {
    return getErrorByStatus(500)
    
  }
}

async function cadastrarParecerista(email) {
  let response = getErrorByStatus(500);
  try {
    if(validateEmail(email)) {
      let user = await UserModel.findOneAndUpdate(
          {email: email},
          {$addToSet: {roles: "parecerista"}}, 
          {upsert: false}
        );
      if(user) {
        console.log("user: ", user)
        response = getSuccessByStatus(200, "Parecerista cadastrado com sucesso!");
      } else {
        response = getErrorByStatus(404, "Usuário não encontrado na base!");
      }
    } else {
      response = getErrorByStatus(400);
    }
  } catch(ex) {
    response = getErrorByStatus(500);
  } finally {
    return response;
  }
}
async function removerParecerista(idUser) {
  try {
    let user = await UserModel.findOneAndUpdate(
      {_id:idUser},
      {$pullAll: {roles: ["coordenador", "parecerista"]}}, 
      {upsert: false}
    );
    if(user)
      return getSuccessByStatus(200, "Parecerista removido com sucesso!");
    else
      return getErrorByStatus(404, "Usuário não encontrado na base!")
  } catch (error) {
    return getErrorByStatus(500)
    
  }
}

async function listarPareceristas() {
  return await UserModel.find({roles: "parecerista"}, {fullname: 1, email: 1, roles: 1});
}

  
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
/* Fim Parecerista */
