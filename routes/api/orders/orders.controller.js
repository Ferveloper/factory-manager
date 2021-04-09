'use strict';

const createError = require('http-errors');
const ordersService = require('./orders.service');

module.exports = {
  listOrders: async function (req, res, next) {
    try {
      console.log('List orders request received');
      const orders = await ordersService.list();
      res.json({
        success: true,
        result: orders
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  getOrder: async function (req, res, next) {
    try {
      console.log('Get order request received:', req.params.id);
      const id = req.params.id;
      const order = await ordersService.get(id);
      if (!order) throw createError(404, 'Order not found');
      res.json({
        success: true,
        result: order
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  importOrder: async function (req, res, next) {
    try {
      console.log('Import order request received:', req.params.id);
      const orderId = req.params.id;
      const importedOrder = await ordersService.import(orderId);
      if (importedOrder.isAlreadyImported) throw createError(400, 'Order is already imported');
      if (importedOrder.notFound) throw createError(404, 'Order not found');
      res.json({
        success: true,
        message: `Order ${orderId} was successfully imported`,
        result: importedOrder
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  updateOrder: async function (req, res, next) {
    try {
      console.log('Update order request received:', req.params.id);
      const orderId = req.params.id;
      const orderDTO = req.body;
      const updatedOrder = await ordersService.update(orderId, orderDTO);
      if (!updatedOrder) throw createError(404, 'Order not found');
      res.json({
        success: true,
        message: `Order ${orderId} was successfully updated`,
        result: updatedOrder
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  deleteOrder: async function (req, res, next) {
    try {
      console.log('Delete order request received:', req.params.id);
      const orderId = req.params.id;
      const deletedOrder = await ordersService.delete(orderId);
      if (!deletedOrder) throw createError(404, 'Order not found');
      res.json({
        success: true,
        message: `Order ${orderId} was successfully deleted`,
        result: deletedOrder
      });

    } catch (err) {
      console.error(err);
      next(err);
    }
  }
};
