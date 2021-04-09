'use strict';

const AssemblyCodeModel = require('./assembly-codes.model');

module.exports = {
  list: async function () {
    const assemblyCodes = await AssemblyCodeModel.find();
    return assemblyCodes.map(doc => doc.toObject());
  },
  get: async function (assemblyCodeId) {
    const assemblyCode = await AssemblyCodeModel.findOne({ assemblyCode: assemblyCodeId });
    return assemblyCode ? assemblyCode.toObject() : null;
  },
  create: async function (assemblyCodeDTO) {
    const assemblyCode = await AssemblyCodeModel.create(assemblyCodeDTO);
    return assemblyCode ? assemblyCode.toObject() : null;
  },
  update: async function (assemblyCodeId, assemblyCodeDTO) {
    const assemblyCode = await AssemblyCodeModel.findOneAndUpdate({ assemblyCode: assemblyCodeId }, assemblyCodeDTO, { new: true, runValidators: true });
    return assemblyCode ? assemblyCode.toObject() : null;
  },
  delete: async function (assemblyCodeId) {
    const assemblyCode = await AssemblyCodeModel.findOneAndDelete({ assemblyCode: assemblyCodeId });
    return assemblyCode ? assemblyCode.toObject() : null;
  },
  listMachines: async function () {
    const assemblyCodes = await AssemblyCodeModel.find({}, 'machine');
    return [...new Set(assemblyCodes.map(doc => doc.machine))];
  }
};
