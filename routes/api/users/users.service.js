'use strict';

const UserModel = require('./users.model');

module.exports = {
  list: async function () {
    const users = await UserModel.find();
    return users.map(user => user.toObject());
  },
  get: async function (username) {
    const user = await UserModel.findOne({ username });
    return user ? user.toObject() : null;
  },
  create: async function (userDTO) {
    let user = await UserModel.create(userDTO);
    return user ? user.toObject() : null;
  },
  update: async function (username, userDTO) {
    let user = await UserModel.findOne({ username });
    if (!user) return user;
    for (const key in userDTO) {
      if (user[key]) user[key] = userDTO[key];
    }
    user.save();
    return user.toObject();
  },
  delete: async function (username) {
    const user = await UserModel.findOneAndDelete({ username });
    return user ? user.toObject() : null;
  }
};
