const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

module.exports = {
  insert,
};

async function insert(user) {
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}
