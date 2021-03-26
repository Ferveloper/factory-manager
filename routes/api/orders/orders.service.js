'use strict';

const OrderModel = require('./orders.model');
const { webServiceUrl } = require ('../../../config');

module.exports = {
  list: async function () {
    const orders = await OrderModel.find();
    return orders;
  },
  get: async function (id) {
    const order = await OrderModel.findOne({ id });
    return order;
  },
  import: async function (id) {
    // TODO: Write import function
    return id;
  },
  update: async function (id, orderDTO) {
    const order = await OrderModel.findOneAndUpdate({ id }, orderDTO, { new: true });
    return order;
  },
  delete: async function (id) {
    const order = await OrderModel.findOneAndDelete({ id });
    return order;
  }
};
