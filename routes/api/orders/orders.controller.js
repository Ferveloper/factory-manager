'use strict';

const ordersService = require('./orders.service');

module.exports = {
  listOrders: function (req, res, next) {
    try {
      console.log('List orders request received');
      const orders = ordersService.list();
      res.json({
        success: true,
        result: orders
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getOrder: function (req, res, next) {
    try {
      console.log('Get order request received:', req.params.id);
      const id = req.params.id;
      const order = ordersService.get(id);
      res.json({
        success: true,
        result: order
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  importOrder: function (req, res, next) {
    try {
      console.log('Import order request received:', req.params.id);
      const orderId = req.params.id;
      const importedOrder = ordersService.import(orderId);
      res.json({
        success: true,
        result: importedOrder
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  updateOrder: function (req, res, next) {
    try {
      console.log('Update order request received:', req.params.id);
      const orderId = req.params.id;
      const orderDTO = req.body;
      const updatedOrder = ordersService.update(orderId, orderDTO);
      res.json({
        success: true,
        result: updatedOrder
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  deleteOrder: function (req, res, next) {
    try {
      console.log('Delete order request received:', req.params.id);
      const orderId = req.params.id;
      const deletedOrder = ordersService.delete(orderId);
      res.json({
        success: true,
        result: deletedOrder
      });

    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
