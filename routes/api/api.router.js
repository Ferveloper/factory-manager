'use strict';

const express = require('express');
const router = express.Router();
const assemblyCodesRouter = require('./assembly-codes/assembly-codes.router');

router.use('/assembly-codes', assemblyCodesRouter);

module.exports = router;
