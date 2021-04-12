'use strict';

const express = require('express');
const router = express.Router();
const ordersRouter = require('./orders/orders.router');
const assemblyCodesRouter = require('./assembly-codes/assembly-codes.router');
const processRoutesRouter = require('./process-routes/process-routes.router');
const usersRouter = require('./users/users.router');

router.use('/orders', ordersRouter);
router.use('/assembly-codes', assemblyCodesRouter);
router.use('/process-routes', processRoutesRouter);
router.use('/users', usersRouter);

module.exports = router;
