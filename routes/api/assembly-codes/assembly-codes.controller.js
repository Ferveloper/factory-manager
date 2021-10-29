'use strict';

const assemblyCodesService = require('./assembly-codes.service');

module.exports = {
  listAssemblyCodes: async function (req, res, next) {
    try {
      console.log('List assembly codes request received');
      const assemblyCodes = await assemblyCodesService.list();
      res.json({
        success: true,
        result: assemblyCodes
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  updateAssemblyCode: async function (req, res, next) {
    try {
      console.log('Update assembly code request received:', req.params.id);
      const assemblyCodeId = req.params.id;
      const assemblyCodeDTO = req.params.body;
      const updatedAssemblyCode = await assemblyCodesService.update(assemblyCodeId, assemblyCodeDTO);
      res.json({
        success: true,
        result: updatedAssemblyCode
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  createAssemblyCode: async function (req, res, next) {
    try {
      console.log('Create assembly code request received:');
      const assemblyCodesDTO = req.body;
      const assemblyCode = await assemblyCodesService.create(assemblyCodesDTO);
      res.json({
        success: true,
        result: assemblyCode
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
