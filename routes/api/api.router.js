'use strict';

const express = require('express');
const router = express.Router();
const ordersRouter = require('./orders/orders.router');
const assemblyCodesRouter = require('./assembly-codes/assembly-codes.router');

router.use('/orders', ordersRouter);
router.use('/assembly-codes', assemblyCodesRouter);

module.exports = router;
