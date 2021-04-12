'use strict';

const mongoose = require('mongoose');

const processRoutesSchema = mongoose.Schema({
  code: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
  type: { type: String, required: true, enum: ['cost', 'time', 'tracking'] },
  class: { type: String, required: true, enum: ['successive', 'simultaneous'] }
});

processRoutesSchema.options.toObject = {
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

const ProcessRoutesModel = mongoose.model('ProcessRoute', processRoutesSchema);

module.exports = ProcessRoutesModel;
