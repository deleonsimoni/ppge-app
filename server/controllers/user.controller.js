const bcrypt = require('bcrypt');
const Joi = require('joi');
const UserModel = require('../models/user.model');
const User = require('../models/user.model');

module.exports = {
  insert,
  getById
};

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function getById(idUser) {
  return await UserModel.findOne({_id: idUser},{hashedPassword: 0, roles: 0});
}
