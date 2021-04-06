'use strict';

const AssemblyCodeModel = require('./assembly-codes.model');

module.exports = {
  list: async function () {
    const assemblyCodes = await AssemblyCodeModel.find({}, { '_id': 0 });
    return assemblyCodes;
  },
  update: async function (id, assemblyCodeDTO) {
    const assemblyCodes = await AssemblyCodeModel.findOneAndUpdate({ id }, assemblyCodeDTO, { new: true });
    return assemblyCodes;
  },
  create: async function (assemblyCodeDTO) {
    let assemblyCode = await new AssemblyCodeModel(assemblyCodeDTO);
    assemblyCode = await assemblyCode.save();
    return assemblyCode;
  }
};
