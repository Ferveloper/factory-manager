'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surnames: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'manager', 'operator', 'laboratory'] }
});

userSchema.options.toObject = {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  }
};

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.validatePassword = async function (data) {
  return bcrypt.compare(data, this.password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
