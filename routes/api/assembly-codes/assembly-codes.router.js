'use strict';

const express = require('express');
const router = express.Router();
const assemblyCodes = require('./assembly-codes.controller');

router.get('/', assemblyCodes.listAssemblyCodes);
router.patch('/:id', assemblyCodes.updateAssemblyCode);
router.post('/', assemblyCodes.createAssemblyCode);

module.exports = router;
