'use strict';

const express = require('express');
const router = express.Router();
const assemblyCodesController = require('./assembly-codes.controller');

router.get('/machines', assemblyCodesController.listMachines);
router.get('/', assemblyCodesController.listAssemblyCodes);
router.get('/:id', assemblyCodesController.getAssemblyCode);
router.post('/', assemblyCodesController.createAssemblyCode);
router.patch('/:id', assemblyCodesController.updateAssemblyCode);
router.delete('/:id', assemblyCodesController.deleteAssemblyCode);

module.exports = router;
