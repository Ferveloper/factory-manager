'use strict';

const createError = require('http-errors');
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
      next(err);
    }
  },
  getAssemblyCode: async function (req, res, next) {
    try {
      console.log('Get assembly code request received:', req.params.id);
      const assemblyCodeId = req.params.id;
      const assemblyCode = await assemblyCodesService.get(assemblyCodeId);
      if (!assemblyCode) throw createError(404, `Assembly code ${assemblyCodeId} not found`);
      res.json({
        success: true,
        result: assemblyCode
      });
    } catch (err) {
      next(err);
    }
  },
  createAssemblyCode: async function (req, res, next) {
    try {
      console.log('Create assembly code request received:');
      const assemblyCodesDTO = req.body;
      const newAssemblyCode = await assemblyCodesService.create(assemblyCodesDTO);
      res.json({
        success: true,
        message: `Assembly code ${newAssemblyCode.assemblyCode} was successfully created`,
        result: newAssemblyCode
      });
    } catch (err) {
      next(err);
    }
  },
  updateAssemblyCode: async function (req, res, next) {
    try {
      console.log('Update assembly code request received:', req.params.id);
      const assemblyCodeId = req.params.id;
      const assemblyCodeDTO = req.body;
      const updatedAssemblyCode = await assemblyCodesService.update(assemblyCodeId, assemblyCodeDTO);
      if (!updatedAssemblyCode) throw createError(404, `Assembly code ${assemblyCodeId} not found`);
      res.json({
        success: true,
        message: `Assembly code ${assemblyCodeId} was successfully updated`,
        result: updatedAssemblyCode
      });
    } catch (err) {
      next(err);
    }
  },
  deleteAssemblyCode: async function (req, res, next) {
    try {
      console.log('Delete assembly code request received:', req.params.username);
      const assemblyCodeId = req.params.id;
      const deletedAssemblyCode = await assemblyCodesService.delete(assemblyCodeId);
      if (!deletedAssemblyCode) throw createError(404, `Assembly code ${assemblyCodeId} not found`);
      res.json({
        success: true,
        message: `Assembly code ${assemblyCodeId} was successfully deleted`,
        result: deletedAssemblyCode
      });
    } catch (err) {
      next(err);
    }
  },
  listMachines: async function (req, res, next) {
    try {
      console.log('List machines request received');
      const assemblyCodes = await assemblyCodesService.listMachines();
      res.json({
        success: true,
        result: assemblyCodes
      });
    } catch (err) {
      next(err);
    }
  }
};
