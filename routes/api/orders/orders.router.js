'use strict';

const express = require('express');
const router = express.Router();
const ordersController = require('./orders.controller');

router.get('/', ordersController.listOrders);
router.get('/:id', ordersController.getOrder);
router.get('/:id/import', ordersController.importOrder);
router.patch('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
