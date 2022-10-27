'use strict';

const express = require('express');
const router = express.Router();
const processRoutesController = require('./process-routes.controller');

router.get('/', processRoutesController.listProcessRoutes);
router.get('/:id', processRoutesController.getProcessRoute);
router.post('/', processRoutesController.createProcessRoute);
router.patch('/:id', processRoutesController.updateProcessRoute);
router.delete('/:id', processRoutesController.deleteProcessRoute);

module.exports = router;
